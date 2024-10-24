import { PaymentEmailInformation } from "@/app/[locale]/components/Types/TPaymentEmailInformation";

export function englishPaymentText(paymentEmailInformation : PaymentEmailInformation){ return `ViajareSIM Receipt

${ paymentEmailInformation.total }

Paid on ${ paymentEmailInformation.datePaid }

Order number: #${ paymentEmailInformation.orderNumber }
Payment method: ${paymentEmailInformation.paymentMethod}

Order Summary

${
        paymentEmailInformation.purchasedPlans.map(plan => `
Region: ${plan.regionName}
Data: ${plan.data}
Duration: ${plan.duration} days
Price: ${plan.salePrice} 
`).join('\n')
    }

    Discount: ${ paymentEmailInformation.appliedDiscount }

    Total: ${ paymentEmailInformation.total }

    ViajareSIM`;
}
