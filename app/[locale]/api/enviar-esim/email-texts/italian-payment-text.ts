import { PaymentEmailInformation } from "@/app/[locale]/components/Types/TPaymentEmailInformation";

export function italianPaymentText(paymentEmailInformation : PaymentEmailInformation){ return `Ricevuta ViajareSIM

${ paymentEmailInformation.total }

Pagato il ${ paymentEmailInformation.datePaid }

Numero ordine: #${ paymentEmailInformation.orderNumber }
Metodo di pagamento: ${paymentEmailInformation.paymentMethod}

Riepilogo Ordine

${
        paymentEmailInformation.purchasedPlans.map(plan => `
Regione: ${plan.regionName}
Dati: ${plan.data}
Durata: ${plan.duration} giorni
Prezzo: ${plan.salePrice} 
`).join('\n')
    }

    Sconto: ${ paymentEmailInformation.appliedDiscount }

    Totale: ${ paymentEmailInformation.total }

    ViajareSIM`;
}
