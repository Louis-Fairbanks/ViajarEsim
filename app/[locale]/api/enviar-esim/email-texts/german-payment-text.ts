import { PaymentEmailInformation } from "@/app/[locale]/components/Types/TPaymentEmailInformation";

export function germanPaymentText(paymentEmailInformation : PaymentEmailInformation){ return `ViajareSIM Beleg

${ paymentEmailInformation.total }

Bezahlt am ${ paymentEmailInformation.datePaid }

Bestellnummer: #${ paymentEmailInformation.orderNumber }
Zahlungsmethode: ${paymentEmailInformation.paymentMethod}

Bestellübersicht

${
        paymentEmailInformation.purchasedPlans.map(plan => `
Region: ${plan.regionName}
Daten: ${plan.data}
Dauer: ${plan.duration} Tage
Preis: ${plan.salePrice} 
`).join('\n')
    }

    Rabatt: ${ paymentEmailInformation.appliedDiscount }

    Gesamt: ${ paymentEmailInformation.total }

    ViajareSIM`;
}
