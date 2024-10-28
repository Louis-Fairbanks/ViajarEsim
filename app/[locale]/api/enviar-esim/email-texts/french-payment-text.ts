import { PaymentEmailInformation } from "@/app/[locale]/components/Types/TPaymentEmailInformation";

export function frenchPaymentText(paymentEmailInformation : PaymentEmailInformation){ return `Reçu ViajareSIM

${ paymentEmailInformation.total }

Payé le ${ paymentEmailInformation.datePaid }

Numéro de commande : #${ paymentEmailInformation.orderNumber }
Méthode de paiement : ${paymentEmailInformation.paymentMethod}

Résumé de la commande

${
        paymentEmailInformation.purchasedPlans.map(plan => `
Région : ${plan.regionName}
Données : ${plan.data}
Durée : ${plan.duration} jours
Prix : ${plan.salePrice} 
`).join('\n')
    }

    Réduction : ${ paymentEmailInformation.appliedDiscount }

    Total : ${ paymentEmailInformation.total }

    ViajareSIM`;
}
