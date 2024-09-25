import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation"

export function orderEmail ({userFirstName, userLastName, orderNumber, regionName, data, duration,
   qrcode, smdpAddress, activationCodeIos, activationCodeAndroid } : EmailInformation){ return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="padding-top: 4px;">
        <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 0 24px;">
            <div style="padding-top: 16px; padding-bottom: 16px;">
                <a href="https://viajaresim.com" style="text-decoration: none; color: black;">
                    <div style="font-size: 1.25rem; font-family: 'Poppins', sans-serif;">
                        <img src="cid:favicon.png" alt="logo viajar esim" width="36" height="36" style="vertical-align: middle;" />
                        <span style="font-weight: 600; font-size: 1.25rem; vertical-align: middle;">ViajareSIM</span>
                    </div>
                </a>
                <div style="margin-top: 8px;">
                    Order ${orderNumber}
                </div>
            </div>
        </div>
    </div>
    <div style="overflow:hidden; border-radius: 8px; max-width: 100%; margin-top: 16px; border: 2px solid #E4E4E4; padding: 0 24px; position: relative;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="padding-top: 24px; padding-bottom: 24px; width: 50%;">
                    <div>${userFirstName} ${userLastName} tu <br><span style="font-weight: bold;">eSIM</span> esta lista</div>
                    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 18px; margin-top: 12px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                                <td style="font-weight: 500;">${regionName}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 500; color: #898989;">Datos</td>
                                <td style="font-weight: 600; text-align: right;">${data}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 500; color: #898989;">Duración</td>
                                <td style="font-weight: 600; text-align: right;">${duration === '1' ? duration + ' Día' : duration +  ' Días'}</td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td style="width: 50%; text-align: right; vertical-align: top;">
                    <img src="cid:mujer-llamando.png" alt="mujer llamando" width="300" height="200" style="max-width: 100%; height: auto;" />
                </td>
            </tr>
        </table>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
        <div style="display: inline-block; text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                    <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">1.</td>
                    <td><h2 style="margin: 0;">Instala tu <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                </tr>
            </table>
            <p>Por favor, préstale mucha atención a la siguiente información.</p>
        </div>
        <div style="position: relative;">
            <img src='cid:hombre-con-celular.png' alt='celular con esim' height="157" width="228" style="max-width: 100%; height: auto;" />
        </div>
        <p style="padding: 0 24px;">Puedes instalarlo antes o durante tu viaje utilizando el código QR a continuación o ingresando los códigos manualmente que se encuentran en este correo electrónico.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Ve a Ajustes en tu dispositivo.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Escanea el código QR o copia y pega los códigos manualmente.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Configura tu eSIM</p>
                </td>
            </tr>
        </table>
        <div style="background-color: #D9E0FF; border-radius: 8px; padding: 24px; margin-top: 20px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td style="width: 24px; vertical-align: top;">
                        <img src='cid:notice.png' alt='' width='24' height='24' />
                    </td>
                    <td style="padding-left: 12px;">
                        <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Te recomendamos conectarte a una red Wi-Fi estable para asegurar un proceso de instalación exitoso y sencillo.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:#E2E7FF; text-align: center; position: relative; margin-top: 20px;">
        <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Descubre instrucciones paso a paso en nuestro sitio web.</h1>
        <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
            <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Ir a instalación de eSIM</span>
        </a>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
        <div style="display: inline-block; text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                    <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">2.</td>
                    <td><h2 style="margin: 0;">Activa tu <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                </tr>
            </table>
        </div>
        <div style="position: relative;">
            <img src='cid:checklist.png' alt='celular con esim' height="157" width="228" style="max-width: 100%; height: auto;" />
        </div>
        <p style="padding: 0 24px;">Una vez completada la instalación, estarás listo para activar tu eSIM. Ten en cuenta que este paso puede tardar hasta 4 minutos y debe realizarse únicamente cuando hayas llegado a tu destino.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Ve a Ajustes en tu dispositivo.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Selecciona tu ViajareSIM eSIM.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Prende los datos roaming.</p>
                </td>
            </tr>
        </table>
        <div style="background-color: #D9E0FF; border-radius: 8px; padding: 24px; margin-top: 20px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td style="width: 24px; vertical-align: top;">
                        <img src='cid:notice.png' alt='' width='24' height='24' />
                    </td>
                    <td style="padding-left: 12px;">
                        <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Te recomendamos conectarte a una red Wi-Fi estable para asegurar un proceso de instalación exitoso y sencillo.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 12px 24px; text-align: center; margin-top: 20px;">
        <h2>Instala tu <span style="color: #6C85FF; font-weight: bold;">eSIM con código QR</span></h2>
        <p style="padding: 0 12px;">Escanea el código QR desde la Configuración de tu dispositivo móvil. Ten en cuenta que puedes instalarla antes o durante tu viaje.</p>
        <img src="${qrcode}" alt="QR Code" style="max-width: 100%; height: auto;" />
        <div style="margin-top: 20px;">
            <h4 style="font-weight: 600; margin-bottom: 0;">O instala manualmente</h4>
            <p style="margin-top: 5px;">Encuentra el código para tu sistema operativo correspondiente justo abajo. Recuerda que los pasos detallados están en el sitio web o en las guías en PDF.</p>
        </div>
    </div>
    <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
        <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
            <h4 style="text-align: center">Para Apple</h4>
            <img style="display: block; margin: 0 auto;" src='cid:appleLogo.png' alt='apple logo' width='40' height='50' />
            <h4 style="margin-bottom: 0;">Dirección SM-DP+</h4>
            <p style="margin-top: 5px;">${smdpAddress}</p>
            <h4 style="margin-bottom: 0;">Código de activación</h4>
            <p style="word-break: break-all; margin-top: 5px;">${activationCodeIos}</p>
            <h4 style="margin-bottom: 0;">Código de confirmación:</h4>
            <p style="margin-top: 5px;">No requerido</p>
        </div>
    </div>
    <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
        <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
        <h4 style="text-align: center">Para Android</h4>
            <img style="display: block; margin: 0 auto;" src='cid:androidLogo.png' alt='android logo' width='33' height='41' />
            <h4 style="margin-bottom: 0;">Código de activación:</h4>
            <p style="word-break: break-all; margin-top: 5px;">${activationCodeAndroid}</p>
        </div>
    </div>
    <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:  #E2FFF6; text-align: center; position: relative; margin-top: 20px;">
        <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">¿Necesitas ayuda con algun problema?</h1>
        <p>No dudes en contactarnos ante cualquier inquietud.</p>
        <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
            <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Ir a centro de ayuda</span>
        </a>
    </div>
    <div style="padding: 24px; text-align: center; margin-top: 20px; margin-bottom: 12px;">
        <div style="padding-bottom: 16px;">
            <a href="https://viajaresim.com" style="text-decoration: none; color: black;">
                <div style="display: inline-block; font-size: 1.25rem; font-family: 'Poppins', sans-serif;">
                    <img src="cid:favicon.png" alt="logo viajar esim" width="36" height="36" style="vertical-align: middle;" />
                    <span style="font-weight: 600; font-size: 1.25rem; vertical-align: middle;">ViajareSIM</span>
                </div>
            </a>
        </div>
    </div>
</div>`}

// <div>
// <a href='https://www.facebook.com/profile.php?id=61564319581940' style="text-decoration: none; margin: 0 12px;"><img src="cid:facebook-svg-repo.png" alt='Facebook Icon' /></a>
// <a href='https://www.instagram.com/viajaresim' style="text-decoration: none; margin: 0 12px;"><img src="cid:instagram-svg-repo.png" alt='Instagram Icon' /></a>
// <a href='https://www.youtube.com/@ViajareSIM' style="text-decoration: none; margin: 0 12px;"><img src="cid:youtube-svgrepo-icon.png" alt='YouTube Icon' /></a>
// <a href='https://x.com/viajaresim' style="text-decoration: none; margin: 0 12px;"><img src="cid:twitter-svgrepo-icon.png" alt='Twitter Icon' /></a>
// <a href='https://www.tiktok.com/@viajaresim' style="text-decoration: none; margin: 0 12px;"><img style="margin-top: 2px;" src="cid:tiktok-svgrepo-icon.png" alt='tiktok' height='20' width='20' /></a>
// </div>

// <div style="margin-top: 20px;">
// <h4 style="font-weight: 600; margin-bottom: 0;">Número de referencia:</h4>
// <p style="margin-top: 5px;">8943108150035815593</p>
// </div>

