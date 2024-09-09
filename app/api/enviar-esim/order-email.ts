import { EmailInformation } from "@/app/components/Types/TEmailInformation"

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
            <img style="display: block; margin: 0 auto;" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABTCAMAAAA7rqAMAAABy1BMVEUAAAAAAACqqqq2tra/v7+/v7/CwsLDw8PDw8PGxsbGxsbFxcXGxsbIyMjKysrKysrMzMzMzMzIyMjGxsbMzMzMzMzR0dHV1dXLy8vJycnIyMjGxsbGxsbHx8fIyMjKysrIyMjHx8fIyMjHx8fGxsbHx8fHx8fJycnGxsbGxsbHx8fHx8fHx8fGxsbHx8fIyMjIyMjHx8fGxsbIyMjGxsbIyMjHx8fHx8fGxsbHx8fHx8fGxsbIyMjIyMjHx8fGxsbGxsbIyMjIyMjGxsbHx8fIyMjHx8fHx8fIyMjHx8fIyMjGxsbGxsbGxsbGxsbHx8fHx8fIyMjHx8fIyMjGxsbIyMjHx8fIyMjHx8fGxsbHx8fHx8fHx8fIyMjGxsbHx8fGxsbHx8fHx8fIyMjHx8fGxsbHx8fHx8fHx8fIyMjHx8fHx8fIyMjHx8fHx8fHx8fHx8fHx8fIyMjHx8fHx8fHx8fHx8fIyMjHx8fHx8fHx8fGxsbHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fIyMjGxsbFxcXGxsbExMT////////Hx8ein0EpAAAAmHRSTlMAAQMHCAQMDxESFBYbHB0YGRQOCQoFCwYiJiUkKCkqKy4xMzY5PUBCR0hJS05RUlNUVlVYWl5gYWNkZWdnam1rcHBzdXh4enx9gIGCfoeLjI+PkpiZnp+ho6Knqa6vsLO0tre4urm8v8HBw8XGyszNztDP09XW19jZ2tzd3+Lj5Obo6uvt7vDx8/X2+Pn7/P3+78s1LCcCAcmV7LcAAAKYSURBVHjardj7N1RRHAXwHYMh8g6VyqsSKa8IIUkvlUSplDxC5JVHRN4VxphRxuw/t5XWzFjmHjP3O+fz+/2uddfe53vWOhCJufG0Kx8aZbXZSFZBm/MDPFAJTSIabfyvEHqc/EyPi9Aifo4eWxHQwTJOr15o0UafauhQTJ9fSdAgaYU+T6DDQ/qsRkEDyxq9nHpKeY0+rdDiJb2GLdBilh7jVmgR4fBMHImGHnGeie3J0CSDB75cgTbp5OZE6yXolGKFj9tqTTP7/fWWvpn52aEX5en+a/3u+wU7ydWh1uIoBCnv1Qa9ppsz4JPdssBD7D1FEQgsu49HDJaF45+Ee1P0M1uMACzPnfS33lFXUt9tp6HuhOODnaR5y9lQu7BMiY0cqLjWKLN+RrW3pyg1qqhpF8U6ImGkjFKbpTBkXaHQyh8Ye0Sh9UwYi/xBmS1lg+5QqB4qo5T5tK9esUJ5UGmgzCCUOilTAaVlijjioZJAmUko5VCmE0qFlHkGpSrKNEGpljLN+kc+1j+yFUo1lOnRn/g8lLIo44yFSgyFqqDitlGmF0oTlHHuQaWdQm+gUkepq1DIpdRiNIwl2yg1nAxjvRTrPq26x+XGjAvvIuV2a2DkK0PxwaifTQyJIx9+YncYiu1E+PvIULxVPjXoPUT705SbC4ORCsrdgqG075RaCoexckrVQmF/hDIzqVDJdUrjVuugRBegFrVE836ewnEKaN5NHK9d+ttqljGzlUxEIGd3aYbjMgIrsNOERgSj0smgvXYjKHU7PGprfvLbJv28S0WQirZ4yM5ArSsMgPtc9YCDh7WlIWh7v+kxcjsRPnENo/RYLIUZ7pL+bdI2fD8TR7ke9K/RudJTmQKz3KmpJ6BwQp3KX7ifFXQWD64qAAAAAElFTkSuQmCC' alt='apple logo' width='40' height='40' />
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
            <img style="display: block; margin: 0 auto;" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABTCAMAAAA7rqAMAAAB4FBMVEUAAACqqqq2tra/v7+/v7+/v7+/v7/FxcXGxsbJycnIyMjGxsbExMTExMTFxcXHx8fIyMjJycnIyMjKysrJycnIyMjIyMjJycnIyMjHx8fGxsbGxsbFxcXFxcXGxsbExMTLy8vKysrMzMzMzMzMzMzR0dHV1dXIyMjGxsbIyMjJycnHx8fGxsbGxsbGxsbGxsbHx8fIyMjIyMjHx8fHx8fGxsbGxsbIyMjIyMjIyMjGxsbHx8fHx8fHx8fGxsbGxsbIyMjHx8fIyMjHx8fHx8fHx8fHx8fHx8fIyMjHx8fHx8fHx8fIyMjHx8fHx8fIyMjGxsbGxsbGxsbGxsbHx8fHx8fHx8fHx8fGxsbHx8fHx8fIyMjHx8fHx8fHx8fIyMjHx8fHx8fHx8fIyMjHx8fHx8fHx8fIyMjHx8fHx8fHx8fGxsbGxsbIyMjHx8fHx8fHx8fHx8fIyMjHx8fHx8fHx8fHx8fHx8fHx8fGxsbHx8fHx8fIyMjGxsbHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fGxsb////////Hx8eKEtIlAAAAn3RSTlMAAwcIBAwQFhITFxsaHh8gJSYqKy8uMzQ4Ozo2NTAoJyIdDwoFCwYOCUFCRENHUFFSU1RWV1VaXF1hYmVoaWxwb3Z4ent8f4CBg4SFhoiJiouHgpCRkpWWmZucnZ6foKGjqKmqrK2ur7Gys7CruLu8vr/Bw8TIycrMy9DRz9TV1tfZ29ze3+Hi4+Xo6err7e7x8/T19vj5+vv8/f65AgF4FdnQAAAChUlEQVR42u3U+VdMYRzH8U/T0I6maGwRTRpZJmRXtMlaVGRNoiKVpZIkLdOCdkkzjM+/6t6ec+fMNDM893GOHzr39dv93PO8f/wippT6umTEkFxXnwLz2sm3dkRl7yVbYF4ryQpEVU61ZOYSuZwV68/3LVBQTnIwHhHy3pMshwp7D8mriHCDZF8ulGQvkj4nkFNYcb+9s7P1XkVhDuD0kYvZUFRCcrjWyxDe2mGSJVAVeMWougNQtX+IUQ25ocbVyJgeuqBg1yD/4EM6TNs5Rd30V67i+/SDmi+bYVLGLDXLHuTdYph3KUgfoWbGAVMSR6l7AMD+maGc2uShbiTR9M3QXIamn6FytGU7SbOXw0PhYzyQucxQFwDUUTgEaXYvKQycr5xhGP/ds02kMBoHWccp6Shkvaakl5CU5KMkXxLkHKO0I5BTRWmVkFPcLK0Ya8C6PCiz7UOE3LIJ+t+4oavpk1YD3YFuPyfLclcVO6jzn4KmhdJaoDntp64jvFlK4dtG88ndS8GLEmqcFC6ZT14hhTGEWE/DM/PJ5zTsAYJSaegyn+yiIdVKWkkraSWt5BpNJtDQYT75k4YEIChugRQazCfvkMJ8HEI8IoUC88mDpNCIUGlTYm2G+SSecsV0GsI4Bkj6b9tUkvENfpL9GVglsO3MiTRAIanZcPLc1gCiUkkGWcn/k3xCaS8g5zqlXYOclFlKmkuDJPckpUy4IS2/oEjTRkNp0YpSGtr0z4J8mFVNww4xZNFQLQYraSWtZHRVNDjE4KDhItR4SGHeJob4eVI4DDW2MQq1xlJPwWuDIuccdT0uY3D1UjfnhLL0xwscr8pH0N6bE1xo2oR/8iti+NuL3yJgjcp0LMsTAAAAAElFTkSuQmCC' alt='android logo' width='33' height='41' />
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

