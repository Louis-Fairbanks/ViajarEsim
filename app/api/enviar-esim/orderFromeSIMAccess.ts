import { PlanFromDb } from "@/app/components/Types/PlanFromDb";
import { v4 as uuidv4 } from 'uuid';

type Order = {
    packageCode: string;
    price: number;
    count: number;
}
type OrderedeSIM = {
    orderNo: string,
    iccid: string,
    qrCodeUrl: string,
    totalDuration: number
    accessCode: string
}

export async function orderFromeSIMAccess(planData: PlanFromDb[]) {
    const hasBalance = await getBalance();
    if (hasBalance) {
        const packageCodesAndPrices = await getPackageCodesAndPrice(planData);
        const orderedeSIMsData = await ordereSIMs(packageCodesAndPrices)
        return orderedeSIMsData;
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

async function getPackageCodesAndPrice(planData: PlanFromDb[]) {
    const allPackages: Order[] = [];

    for (const plan of planData) {
        //for unlimited plans you need to search by 1GB/day and order the quantity of days
        const dataNameCheck: string = plan.data + 'GB';

        const availablePlansForRegion = await getPlans(plan.region_isocode);
        const requestedPlanFromRegion = availablePlansForRegion.filter((individualPlan: any) => {
            return individualPlan.duration == plan.duracion && individualPlan.name.includes(dataNameCheck);
        });

        const planToPurchasePackageAndPrice: Order[] = requestedPlanFromRegion.map((individualPlan: any) => {
            return { packageCode: individualPlan.packageCode, price: individualPlan.price, count: plan.quantity };
        });

        allPackages.push(...planToPurchasePackageAndPrice);
    }
    return allPackages;
}

async function ordereSIMs(packageData: Order[]) {

    const uniqueTransactionId = uuidv4();
    const accessCode = process.env.ESIM_ACCESS_CODE;
    if (!accessCode) {
        console.error('ESIM_ACCESS_CODE is not set');
        return;
    }
    console.log('Were goign to be ordering ')
    console.log(packageData)
    const amount = packageData.reduce((total, individualPackage) => {
        return total + (individualPackage.price * individualPackage.count);
    }, 0);
    // const orderString = 'https://api.esimaccess.com/api/v1/open/esim/order'
    // const packageInfoList = packageData.map(individualPackage => ({
    //     packageCode: individualPackage.packageCode,
    //     count: individualPackage.count,
    //     price: individualPackage.price
    // }));

    // const orderResponse = await fetch(orderString, {
    //     method: 'POST',
    //     headers: {
    //         'RT-AccessCode': accessCode,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         'transactionId': uniqueTransactionId,
    //         'amount': amount,
    //         'packageInfoList': packageInfoList
    //     })
    // });

    // if (!orderResponse.ok) {
    //     console.log('Error fetching data')
    //     return
    // }

    // const data = await orderResponse.json();
    // console.log(data.obj.orderNo)

    const queryOrderReadyString = 'https://api.esimaccess.com/api/v1/open/esim/query'
    //if this doesn't return an object list it needs to be called again in about 5 seconds to check if the order is ready
    const orderReadyResponse = await fetch(queryOrderReadyString, {
        method: 'POST',
        headers: {
            'RT-AccessCode': accessCode,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'orderNo': 'B24090303050008',
            'pager': {
                "pageNum":1,
                "pageSize":20
            }
        })
    })

    if (!orderReadyResponse.ok) {
        console.log('Error fetching data')
        return
    }
    const orderReadyData = await orderReadyResponse.json();
    if (orderReadyData.obj.esimList) {
        const orderedeSIMs: OrderedeSIM[] = orderReadyData.obj.esimList.map((esim: any) => ({
            orderNo: esim.orderNo,
            iccid: esim.iccid,
            qrCodeUrl: esim.qrCodeUrl,
            totalDuration: esim.totalDuration,
            accessCode: esim.ac // 'ac' is mapped to 'accessCode'
        }));
        return orderedeSIMs;
    }
}