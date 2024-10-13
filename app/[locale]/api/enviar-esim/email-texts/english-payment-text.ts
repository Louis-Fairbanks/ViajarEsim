import { PaymentEmailInformation } from "@/app/[locale]/components/Types/TPaymentEmailInformation";

export function englishPaymentText(paymentEmailInformation : PaymentEmailInformation){ return `ViajareSIM Receipt

${ paymentEmailInformation.total } USD

Paid on ${ paymentEmailInformation.datePaid }

Order number: #${ paymentEmailInformation.orderNumber }
Payment method: ${paymentEmailInformation.paymentMethod}

Order Summary

${
        paymentEmailInformation.purchasedPlans.map(plan => `
Region: ${plan.regionName}
Data: ${plan.data}
Duration: ${plan.duration} days
Price: ${plan.salePrice} USD
`).join('\n')
    }

    Discount: $${ paymentEmailInformation.appliedDiscount } USD

    Total: $${ paymentEmailInformation.total } USD

    ViajareSIM`;
}
