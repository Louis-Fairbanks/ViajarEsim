import { PlanFromDb } from "@/app/[locale]/components/Types/PlanFromDb";
import { v4 as uuidv4 } from 'uuid';
import { OrderedeSIM } from "@/app/[locale]/components/Types/TOrderedEsim";
import { setTimeout } from "timers/promises";


//this type is eSIMaccess-specific
type Order = {
    packageCode: string;
    price: number;
    count: number;
    periodNum?: number
}

export async function orderFromeSIMAccess(planData: PlanFromDb[]): Promise<OrderedeSIM[]> {
    // first check if we have enough balance if this fails then we're going out of business
    const hasBalance = await getBalance();
    if (!hasBalance) {
        console.error('Insufficient balance');
        return [];
    }

    //this will be an Order[] with all the information from the plans
    const packageCodesAndPrices = await getPackageCodesAndPrice(planData);
    console.log('Package codes and prices:', packageCodesAndPrices);

    try {
        const orderResponse = await ordereSIMs(packageCodesAndPrices);
        console.log('eSIMaccess order response:', orderResponse);

        if (!(orderResponse as any).obj || !(orderResponse as any).obj.esimList) {
            console.error('Invalid order response structure');
            return [];
        }

        const orderedeSIMs: OrderedeSIM[] = [];

        for (const esim of (orderResponse as any).obj.esimList) {
            for (const package_ of esim.packageList) {
                console.log('here is hte list of packages associated with the esim')
                console.log(esim)
                const correspondingPlan = planData.find(plan => plan.isocode.toUpperCase() === package_.locationCode);

                //find the corresponding plans from the palnData and associate all its information to fill out the OrderedeSIM type
                if (correspondingPlan) {
                    let dataForEmail;
                    if (correspondingPlan.data === 'unlimited') {
                        dataForEmail = 'Datos Ilimitados';
                    } else {
                        dataForEmail = `${correspondingPlan.data} GB`;
                    }             
                    
                    const orderedeSIM: OrderedeSIM = {
                        orderNo: esim.esimTranNo,
                        regionName: correspondingPlan.region_nombre,
                        data: dataForEmail,
                        salePrice: correspondingPlan.precio,
                        qrCodeUrl: esim.qrCodeUrl,
                        totalDuration: parseInt(correspondingPlan.duracion),
                        smdpAddress: esim.ac.split('$')[1],
                        accessCodeIos: esim.ac.split('$')[2],
                        accessCodeAndroid: esim.ac,
                        iccid: esim.iccid,
                        pedidos_planes_id: correspondingPlan.planes_pedidos_id
                    };

                    orderedeSIMs.push(orderedeSIM);
                    console.log('Created OrderedeSIM:', orderedeSIM);
                } else {
                    console.warn(`No corresponding plan found for locationCode: ${package_.locationCode}`);
                }
            }
        }

        console.log('Final OrderedeSIM array:', orderedeSIMs);
        return orderedeSIMs;
    } catch (error) {
        console.error('Error ordering eSIMs:', error);
        return [];
    }
}
async function getBalance() {
    const fetchString = 'https://api.esimaccess.com/api/v1/open/balance/query'
    //validate that the access code is set
    const accessCode = process.env.ESIM_ACCESS_CODE;
    if (!accessCode) {
        console.error('ESIM_ACCESS_CODE is not set');
        return;
    }
    //fetch balance
    const response = await fetch(fetchString, {
        method: 'POST',
        headers: {
            'RT-AccessCode': accessCode,
        },
    })
    if (!response.ok) {
        console.log('Error fetching data')
        return
    }
    const data = await response.json();
    //return if balance is less than 100
    if (data.obj.balance < 100) {
        return false
    } else return true;
}

async function getPlans(isocode: string) {
    const accessCode = process.env.ESIM_ACCESS_CODE;
    if (!accessCode) {
        console.error('ESIM_ACCESS_CODE is not set');
        return;
    }
    //fetch plans and convert isocode to uppercase
    const getPackageString = 'https://api.esimaccess.com/api/v1/open/package/list'
    const responsePackage = await fetch(getPackageString, {
        method: 'POST',
        headers: {
            'RT-AccessCode': accessCode,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            locationCode: isocode.toUpperCase()
        })
    })
    if (!responsePackage.ok) {
        console.log('Error fetching data')
        return
    }
    //return the plans excluding the global packages
    const dataPackage = await responsePackage.json();
    const excludedGlobalPackages = dataPackage.obj.packageList.filter((individualPackage: any) => { return !individualPackage.slug.includes('GL') })
    return excludedGlobalPackages;
}

async function getPackageCodesAndPrice(planData: PlanFromDb[]): Promise<Order[]> {
    const allPackages: Order[] = [];

    //for each plan in the planfromdb array, which could of course include duplicates
    for (const plan of planData) {
        let dataNameCheck: string;
        let periodNum: number | undefined;

        //unlimited plans have a different naming convention which we use
        if (plan.data === 'unlimited') {
            dataNameCheck = '1GB/Day';
            periodNum = parseInt(plan.duracion);
        } else {
            dataNameCheck = `${plan.data}GB`;
        }
        //this just logs what we're going to be checking for in the plan list
        console.log('Processing plan:', plan);
        console.log('Data name check:', dataNameCheck, 'Period number:', periodNum);
        const availablePlansForRegion = await getPlans(plan.isocode);

        console.log(availablePlansForRegion)
        const requestedPlan = availablePlansForRegion.find((individualPlan: any) => {
            let slugCheck: string;
            if (plan.data === 'unlimited') {
                //some specific countries where we switch the type of plan we order
                //but for the most part we're ordering the 500mb daily plan or if its not unlimited it follows the othe rpattern
                if (plan.isocode === 'br' && plan.duracion === '30' || plan.isocode === 'my' || plan.isocode === 'sg' && plan.duracion === '60') {
                    slugCheck = plan.isocode.toUpperCase() + '_0.5_Daily';
                }
                else {
                    slugCheck = plan.isocode.toUpperCase() + '_1_Daily';
                }
            }
            else {
                slugCheck = plan.isocode.toUpperCase() + '_' + plan.data + '_' + plan.duracion;
            }
            return individualPlan.slug === slugCheck;
        });
        // this returns all of the relevant data that needs to be passed to the post request for the purchase function as well as the planes_pedidos_id
        //which is necessary to associate the id with the right purchased plan
        if (requestedPlan) {
            const planToPurchase: Order = {
                packageCode: requestedPlan.packageCode,
                price: requestedPlan.price,
                count: 1,
                periodNum: periodNum
            };
            allPackages.push(planToPurchase);
        } else {
            console.warn(`No matching plan found for: ${plan.isocode} ${plan.data}GB ${plan.duracion}`);
        }
    }
    return allPackages;
}

async function ordereSIMs(packageData: Order[]): Promise<any> {
    const uniqueTransactionId = uuidv4();
    const accessCode = process.env.ESIM_ACCESS_CODE;
    if (!accessCode) {
        console.error('ESIM_ACCESS_CODE is not set');
        throw new Error('ESIM_ACCESS_CODE is not set');
    }

    console.log('We\'re going to be ordering:', packageData);

    // const amount = packageData.reduce((total, individualPackage) => {
    //     return total + (individualPackage.price * individualPackage.count * (individualPackage.periodNum || 1));
    // }, 0);
    const packageInfoList = packageData.map(individualPackage => ({
        packageCode: individualPackage.packageCode,
        count: individualPackage.count,
        price: individualPackage.price,
        periodNum: individualPackage.periodNum
    }));

    const orderString = 'https://api.esimaccess.com/api/v1/open/esim/order';
    const orderResponse = await fetch(orderString, {
        method: 'POST',
        headers: {
            'RT-AccessCode': accessCode,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'transactionId': uniqueTransactionId,
            'packageInfoList': packageInfoList
        })
    });

    if (!orderResponse.ok) {
        console.error('Error placing order');
        throw new Error('Failed to place order');
    }

    const data = await orderResponse.json();
    console.log('Initial order response:', data);

    // Implement retry mechanism
    const maxRetries = 6; // 60 seconds total (6 * 10 seconds)
    for (let i = 0; i < maxRetries; i++) {
        console.log(`Checking order status, attempt ${i + 1} of ${maxRetries}`);
        const orderStatus = await checkOrderStatus(data.obj.orderNo, accessCode);

        if (orderStatus.success && orderStatus.obj && orderStatus.obj.esimList) {
            console.log('Order is ready:', orderStatus);
            return orderStatus;
        }

        console.log('Order not ready yet, waiting 10 seconds before retrying...');
        await setTimeout(10000); // Wait for 10 seconds
    }

    console.error('Order did not complete within the expected time');
    throw new Error('Order timeout');
}

async function checkOrderStatus(orderNo: string, accessCode: string): Promise<any> {
    const queryOrderReadyString = 'https://api.esimaccess.com/api/v1/open/esim/query';
    const orderReadyResponse = await fetch(queryOrderReadyString, {
        method: 'POST',
        headers: {
            'RT-AccessCode': accessCode,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'orderNo': orderNo,
            'pager': {
                "pageNum": 1,
                "pageSize": 20
            }
        })
    });

    if (!orderReadyResponse.ok) {
        console.error('Error fetching order status');
        throw new Error('Failed to fetch order status');
    }

    return orderReadyResponse.json();
}