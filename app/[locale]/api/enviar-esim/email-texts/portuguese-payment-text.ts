import { PaymentEmailInformation } from "@/app/[locale]/components/Types/TPaymentEmailInformation";

export function portuguesePaymentText(paymentEmailInformation: PaymentEmailInformation) {
  return `Recibo da ViajareSIM

${ paymentEmailInformation.total }

Pago em ${ paymentEmailInformation.datePaid }

Número do pedido: #${ paymentEmailInformation.orderNumber }
Método de pagamento: ${paymentEmailInformation.paymentMethod}

Resumo do pedido

${
        paymentEmailInformation.purchasedPlans.map(plan => `
Região: ${plan.regionName}
Dados: ${plan.data}
Duração: ${plan.duration} dias
Preço: ${plan.salePrice}
`).join('\n')
    }

    Desconto: ${ paymentEmailInformation.appliedDiscount }

    Total: ${ paymentEmailInformation.total }

    ViajareSIM`;
}
