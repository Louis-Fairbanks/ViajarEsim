import { PaymentEmailInformation } from "@/app/components/Types/TPaymentEmailInformation"
import { PlanPricingInfo } from "@/app/components/Types/TPlanPricingInfo"

export function paymentConfirmationEmail(paymentEmailInformation: PaymentEmailInformation) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
    <style>
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
        @media screen and (max-width: 525px) {
            .wrapper { width: 100% !important; max-width: 100% !important; }
            .responsive-table { width: 100% !important; }
            .padding { padding: 10px 5% 15px 5% !important; }
            .section-padding { padding: 0 15px 50px 15px !important; }
        }
        .container { max-width: 600px; margin: 0 auto; }
        .content-block { padding: 10px; }
        .header { padding: 20px 0; }
        .footer { padding: 20px 0; text-align: center; }
    </style>
</head>
<body style="margin: 0 !important; padding: 0 !important; background-color: #f8f8fb;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 10px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" class="responsive-table">
                    <!-- Header -->
                    <tr>
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left" style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #C7C7C7; border-radius: 8px;">
                                        <a href="https://viajaresim.com" style="text-decoration: none; color: black; font-size: 20px; font-weight: bold;">
                                            <img src="cid:favicon.png" alt="logo viajar esim" width="36" height="36" style="vertical-align: middle; margin-right: 10px;" />
                                            ViajareSIM
                                        </a>
                                        <span style="float: right; font-size: 14px;">Order ${paymentEmailInformation.orderNumber}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Welcome Message -->
                    <tr>
                        <td style="padding: 20px 0;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 2px solid #E4E4E4; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
                                        <h2 style="font-size: 18px; margin: 0 0 10px 0;">Hola <strong>${paymentEmailInformation.firstName} ${paymentEmailInformation.lastName}</strong>,<br/> gracias por tu compra!</h2>
                                        <p style="margin: 0 0 10px 0;">Recibirás un correo electrónico para cada uno de tus productos con instrucciones de instalación. Revisa tu carpeta de spam.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 0 20px 20px;">
                                        <img src="cid:mujer-con-tarjeta-credito.png" alt="mujer con tarjeta de credito" width="250" style="max-width: 100%; height: auto;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Receipt -->
                    <tr>
                        <td style="padding: 20px 0;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 2px solid #c7c7c7; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
                                        <h2 style="font-size: 18px; margin: 0 0 10px 0;">Recibo de ViajareSIM</h2>
                                        <hr style="border: 1px solid #C7C7C7; border-bottom: 0; margin: 10px 0;" />
                                        <h1 style="font-size: 36px; margin: 10px 0;">${paymentEmailInformation.total} <span style="font-size: 18px; color: #898989;">USD</span></h1>
                                        <p style="margin: 0 0 10px 0;">Pagado el ${paymentEmailInformation.datePaid}</p>
                                        <hr style="border: 1px solid #C7C7C7; border-bottom: 0; margin: 10px 0;" />
                                        <table width="100%" border="0" cellspacing="0" cellpadding="5">
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 14px; color: #898989;">Número de orden</td>
                                                <td align="right" style="font-family: Arial, sans-serif; font-size: 14px;">#${paymentEmailInformation.orderNumber}</td>
                                            </tr>
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 14px; color: #898989;">Método de pago</td>
                                                <td align="right" style="font-family: Arial, sans-serif; font-size: 14px;">Tarjeta de crédito/débito</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Order Summary -->
                    <tr>
                        <td style="padding: 20px 0;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 2px solid #c7c7c7; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
                                        <h2 style="font-size: 18px; margin: 0 0 10px 0;">Resúmen del pedido</h2>
                                        <hr style="border: 1px solid #C7C7C7; border-bottom: 0; margin: 10px 0;" />
                                        <table width="100%" border="0" cellspacing="0" cellpadding="5">
                                            ${paymentEmailInformation.purchasedPlans.map(plan => generateLineItem(plan)).join('')}
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 14px; color: #898989;">Descuento</td>
                                                <td align="right" style="font-family: Arial, sans-serif; font-size: 14px;">$${paymentEmailInformation.appliedDiscount} <span style="font-size: 12px; color: #898989;">USD</span></td>
                                            </tr>
                                        </table>
                                        <hr style="border: 1px solid #C7C7C7; border-bottom: 0; margin: 10px 0;" />
                                        <table width="100%" border="0" cellspacing="0" cellpadding="5" style="background-color: #f8f8fb;">
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 14px;"><strong>Total</strong></td>
                                                <td align="right" style="font-family: Arial, sans-serif; font-size: 14px;"><strong>$${paymentEmailInformation.total} <span style="font-size: 12px; color: #898989;">USD</span></strong></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 0; text-align: center;">
                            <a href="https://viajaresim.com" style="text-decoration: none; color: black; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold;">
                                <img src="cid:favicon.png" alt="logo viajar esim" width="36" height="36" style="vertical-align: middle; margin-right: 10px;" />
                                ViajareSIM
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}

function generateLineItem(plan: PlanPricingInfo) {
    return `
        <tr>
            <td style="font-family: Arial, sans-serif; font-size: 14px; color: #898989;">Región</td>
            <td align="right" style="font-family: Arial, sans-serif; font-size: 14px;">${plan.regionName}</td>
        </tr>
        <tr>
            <td style="font-family: Arial, sans-serif; font-size: 14px; color: #898989;">Datos</td>
            <td align="right" style="font-family: Arial, sans-serif; font-size: 14px;">${plan.data}</td>
        </tr>
        <tr>
            <td style="font-family: Arial, sans-serif; font-size: 14px; color: #898989;">Duración</td>
            <td align="right" style="font-family: Arial, sans-serif; font-size: 14px;">${plan.duration} días</td>
        </tr>
        <tr>
            <td style="font-family: Arial, sans-serif; font-size: 14px; color: #898989;">Precio</td>
            <td align="right" style="font-family: Arial, sans-serif; font-size: 14px;">${plan.salePrice} <span style="font-size: 12px; color: #898989;">USD</span></td>
        </tr>
        <tr><td colspan="2"><hr style="border: 1px solid #C7C7C7; border-bottom: 0; margin: 10px 0;" /></td></tr>
    `
}


// <tr>
// <td align="center" valign="middle">
// <a href='https://www.facebook.com/profile.php?id=61564319581940' style="text-decoration: none; margin: 0 12px;"><img src="cid:facebook-svg-repo.png" alt='Facebook Icon' /></a>
// <a href='https://www.instagram.com/viajaresim' style="text-decoration: none; margin: 0 12px;"><img src="cid:instagram-svg-repo.png" alt='Instagram Icon' /></a>
// <a href='https://www.youtube.com/@ViajareSIM' style="text-decoration: none; margin: 0 12px;"><img src="cid:youtube-svgrepo-icon.png" alt='YouTube Icon' /></a>
// <a href='https://x.com/viajaresim' style="text-decoration: none; margin: 0 12px;"><img src="cid:twitter-svgrepo-icon.png" alt='Twitter Icon' /></a>
// <a href='https://www.tiktok.com/@viajaresim' style="text-decoration: none; margin: 0 12px;"><img style="margin-top: 2px;" src="cid:tiktok-svgrepo-icon.png" alt='tiktok' height='20' width='20' /></a>
// </td>
// </tr>