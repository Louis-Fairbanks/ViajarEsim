import { PaymentEmailInformation } from "@/app/[locale]/components/Types/TPaymentEmailInformation";

export function spanishPaymentText(paymentEmailInformation : PaymentEmailInformation){ return `Recibo de ViajareSIM

${ paymentEmailInformation.total } USD

Pagado el ${ paymentEmailInformation.datePaid }

Número de orden: #${ paymentEmailInformation.orderNumber }
Método de pago: ${paymentEmailInformation.paymentMethod}

Resúmen del pedido

${
        paymentEmailInformation.purchasedPlans.map(plan => `
Región: ${plan.regionName}
Datos: ${plan.data}
Duración: ${plan.duration} días
Precio: ${plan.salePrice} USD
`).join('\n')
    }

    Descuento: $${ paymentEmailInformation.appliedDiscount } USD

    Total: $${ paymentEmailInformation.total } USD

    ViajareSIM`;
}