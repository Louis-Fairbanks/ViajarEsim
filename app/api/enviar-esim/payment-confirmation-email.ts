import { PaymentEmailInformation } from "@/app/components/Types/TPaymentEmailInformation"
import { PlanPricingInfo } from "@/app/components/Types/TPlanPricingInfo"

export function paymentConfirmationEmail(paymentEmailInformation: PaymentEmailInformation) {
    return `<table border="0" cellpadding="0" cellspacing="0" width="100%" id="bodyTable" style="margin: 0; padding: 0; width: 100% !important; height: 100% !important;">
    <tr>
        <td align="center" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: separate; border-spacing: 0 8px;">
                <!-- Header -->
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="20" cellspacing="0" width="100%" style="border: 2px solid #E4E4E4; border-radius: 8px;">
                            <tr>
                                <td align="left" valign="middle">
                                    <a href="https://viajaresim.com" style="text-decoration: none; color: black; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold;">
                                        <img src="cid:favicon.png" alt="logo viajar esim" width="36" height="36" style="border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; vertical-align: middle;" />
                                        ViajareSIM
                                    </a>
                                </td>
                                <td align="right" valign="middle" style="font-family: Arial, sans-serif; font-size: 14px;">
                                    Order ${paymentEmailInformation.orderNumber}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <!-- Welcome Message -->
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="20" cellspacing="0" width="100%" style="border: 2px solid #E4E4E4; border-radius: 8px;">
                            <tr>
                                <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">
                                    <h2 style="font-family: Arial, sans-serif; font-size: 18px; line-height: 125%; margin: 0 0 10px 0;">Hola <strong>${paymentEmailInformation.firstName} ${paymentEmailInformation.lastName}</strong>,<br/> gracias por tu compra!</h2>
                                    <p style="margin: 0 0 10px 0;">Recibirás un correo electrónico para cada uno de tus productos con instrucciones de instalación. Revisa tu carpeta de spam.</p>
                                </td>
                                <td align="right" valign="top" width="250">
                                    <img src="cid:mujer-con-tarjeta-credito.png" alt="mujer con tarjeta de credito" width="250" height="200" style="border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; display: block;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <!-- Help Section -->
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="20" cellspacing="0" width="100%" style="background-color: #E2E7FF; border-radius: 8px;">
                            <tr>
                                <td align="center" valign="middle" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">
                                    <h2 style="font-family: Arial, sans-serif; font-size: 18px; line-height: 125%; margin: 0 0 10px 0;">¿Necesitas ayuda con algun problema?</h2>
                                    <p style="margin: 0 0 10px 0;">No dudes en contactarnos ante cualquier inquietud.</p>
                                    <a href="https://viajaresim.com/centro-de-ayuda" style="background-color: #6C85FF; border-radius: 8px; color: #FFFFFF; display: inline-block; font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; line-height: 40px; text-align: center; text-decoration: none; width: 200px; -webkit-text-size-adjust: none;">Ir al centro de ayuda</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <!-- Receipt -->
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="20" cellspacing="0" width="100%" style="border: 2px solid #c7c7c7; border-radius: 8px;">
                            <tr>
                                <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">
                                    <h2 style="font-family: Arial, sans-serif; font-size: 18px; line-height: 125%; margin: 0 0 10px 0;">Recibo de ViajareSIM</h2>
                                    <hr style="border: 1px solid #C7C7C7; border-bottom: 0; margin: 10px 0;" />
                                    <h1 style="font-family: Arial, sans-serif; font-size: 36px; line-height: 125%; margin: 10px 0;">${paymentEmailInformation.total} <span style="font-size: 18px; color: #898989;">USD</span></h1>
                                    <p style="margin: 0 0 10px 0;">Pagado el ${paymentEmailInformation.datePaid}</p>
                                    <hr style="border: 1px solid #C7C7C7; border-bottom: 0; margin: 10px 0;" />
                                    <table border="0" cellpadding="5" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%; color: #898989;">Número de orden</td>
                                            <td align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">#${paymentEmailInformation.orderNumber}</td>
                                        </tr>
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%; color: #898989;">Método de pago</td>
                                            <td align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">Tarjeta de crédito/débito</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <!-- Order Summary -->
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="20" cellspacing="0" width="100%" style="border: 2px solid #c7c7c7; border-radius: 8px;">
                            <tr>
                                <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">
                                    <h2 style="font-family: Arial, sans-serif; font-size: 18px; line-height: 125%; margin: 0 0 10px 0;">Resúmen del pedido</h2>
                                    <hr style="border: 1px solid #C7C7C7; border-bottom: 0; margin: 10px 0;" />
                                    <table border="0" cellpadding="5" cellspacing="0" width="100%">
                                        ${paymentEmailInformation.purchasedPlans.map(plan => {
                                                generateLineItem(plan)
                                            })}
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%; color: #898989;">Descuento</td>
                                            <td align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">$${paymentEmailInformation.appliedDiscount} <span style="font-size: 12px; color: #898989;">USD</span></td>
                                        </tr>
                                    </table>
                                    <hr style="border: 1px solid #C7C7C7; border-bottom: 0; margin: 10px 0;" />
                                    <table border="0" cellpadding="5" cellspacing="0" width="100%" style="background-color: #f8f8fb;">
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;"><strong>Total</strong></td>
                                            <td align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;"><strong>$${paymentEmailInformation.total} <span style="font-size: 12px; color: #898989;">USD</span></strong></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                    <td align="center" valign="top">
                        <table border="0" cellpadding="20" cellspacing="0" width="100%" style="border: 2px solid #C7C7C7; border-radius: 8px;">
                            <tr>
                                <td align="center" valign="middle">
                                    <a href="https://viajaresim.com" style="text-decoration: none; color: black; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold;">
                                        <img src="cid:favicon.png" alt="logo viajar esim" width="36" height="36" style="border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; vertical-align: middle;" />
                                        ViajareSIM
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="middle">
                                <a href='https://www.facebook.com/profile.php?id=61564319581940' style="text-decoration: none; margin: 0 12px;"><img src="cid:facebook-svg-repo.png" alt='Facebook Icon' /></a>
                                <a href='https://www.instagram.com/viajaresim' style="text-decoration: none; margin: 0 12px;"><img src="cid:instagram-svg-repo.png" alt='Instagram Icon' /></a>
                                <a href='https://www.youtube.com/@ViajareSIM' style="text-decoration: none; margin: 0 12px;"><img src="cid:youtube-svgrepo-icon.png" alt='YouTube Icon' /></a>
                                <a href='https://x.com/viajaresim' style="text-decoration: none; margin: 0 12px;"><img src="cid:twitter-svgrepo-icon.png" alt='Twitter Icon' /></a>
                                <a href='https://www.tiktok.com/@viajaresim' style="text-decoration: none; margin: 0 12px;"><img style="margin-top: 2px;" src="cid:tiktok-svgrepo-icon.png" alt='tiktok' height='20' width='20' /></a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`
}

function generateLineItem(plan: PlanPricingInfo) {
  return  `                                    <tr>
    <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%; color: #898989;">Región</td>
    <td align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">${plan.regionName}</td>
</tr>
        <tr>
            <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%; color: #898989;">Datos</td>
            <td align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">${plan.data} GB</td>
        </tr>
        <tr>
            <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%; color: #898989;">Duración</td>
            <td align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">${plan.duration} días</td>
        </tr>
        <tr>
        <td align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%; color: #898989;">Precio</td>
        <td align="right" valign="top" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 150%;">${plan.salePrice} <span style="font-size: 12px; color: #898989;">USD</span></td>
    </tr>
        `
}