import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation";

export function orderEmailGerman ({userFirstName, userLastName, orderNumber, regionName, data, duration,
    qrcode, smdpAddress, activationCodeIos, activationCodeAndroid, iccid } : EmailInformation){ return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
     <div style="padding-top: 4px;">
         <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 0 24px;">
             <div style="padding-top: 16px; padding-bottom: 16px;">
                 <a href="https://viajaresim.com" style="text-decoration: none; color: black;">
                     <div style="font-size: 1.25rem; font-family: 'Poppins', sans-serif;">
                         <img src="cid:favicon.png" alt="viajar esim logo" width="36" height="36" style="vertical-align: middle;" />
                         <span style="font-weight: 600; font-size: 1.25rem; vertical-align: middle;">ViajareSIM</span>
                     </div>
                 </a>
                 <div style="margin-top: 8px;">
                     Bestellung ${orderNumber}
                 </div>
             </div>
         </div>
     </div>
     <div style="overflow:hidden; border-radius: 8px; max-width: 100%; margin-top: 16px; border: 2px solid #E4E4E4; padding: 0 24px; position: relative;">
         <table cellpadding="0" cellspacing="0" border="0" width="100%">
             <tr>
                 <td style="padding-top: 24px; padding-bottom: 24px; width: 50%;">
                     <div>${userFirstName} ${userLastName}, Ihre <br><span style="font-weight: bold;">eSIM</span> ist bereit</div>
                     <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 18px; margin-top: 12px;">
                         <table cellpadding="0" cellspacing="0" border="0" width="100%">
                             <tr>
                                 <td style="font-weight: 500;">${regionName}</td>
                             </tr>
                             <tr>
                                 <td style="font-weight: 500; color: #898989;">Daten</td>
                                 <td style="font-weight: 600; text-align: right;">${data}</td>
                             </tr>
                             <tr>
                                 <td style="font-weight: 500; color: #898989;">Dauer</td>
                                 <td style="font-weight: 600; text-align: right;">${duration === '1' ? duration + ' Tag' : duration + ' Tage'}</td>
                             </tr>
                         </table>
                     </div>
                 </td>
                 <td style="width: 50%; text-align: right; vertical-align: top;">
                     <img src="cid:mujer-llamando.png" alt="Frau beim Telefonieren" width="300" height="200" style="max-width: 100%; height: auto;" />
                 </td>
             </tr>
         </table>
     </div>
     <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
         <div style="display: inline-block; text-align: center;">
             <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                 <tr>
                     <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">1.</td>
                     <td><h2 style="margin: 0;">Installieren Sie Ihre <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                 </tr>
             </table>
             <p>Bitte beachten Sie die folgenden Informationen sorgfältig.</p>
         </div>
         <div style="position: relative;">
             <img src='cid:hombre-con-celular.png' alt='Telefon mit eSIM' height="157" width="228" style="max-width: 100%; height: auto;" />
         </div>
         <p style="padding: 0 24px;">Sie können sie vor oder während Ihrer Reise installieren, indem Sie den unten stehenden QR-Code scannen oder die manuellen Codes in dieser E-Mail eingeben.</p>
         <table cellpadding="0" cellspacing="0" border="0" width="100%">
             <tr>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Gehen Sie zu den Einstellungen auf Ihrem Gerät.</p>
                 </td>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Scannen Sie den QR-Code oder kopieren Sie die manuellen Codes.</p>
                 </td>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Richten Sie Ihre eSIM ein</p>
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
                         <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Wir empfehlen, eine stabile WLAN-Verbindung zu nutzen, um eine reibungslose Installation zu gewährleisten.</p>
                     </td>
                 </tr>
             </table>
         </div>
     </div>
     <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:#E2E7FF; text-align: center; position: relative; margin-top: 20px;">
         <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Erfahren Sie Schritt-für-Schritt-Anleitungen auf unserer Website.</h1>
         <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
             <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Zur eSIM-Installation</span>
         </a>
     </div>
     <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
         <div style="display: inline-block; text-align: center;">
             <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                 <tr>
                     <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">2.</td>
                     <td><h2 style="margin: 0;">Aktivieren Sie Ihre <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                 </tr>
             </table>
         </div>
         <div style="position: relative;">
             <img src='cid:checklist.png' alt='Telefon mit eSIM' height="157" width="228" style="max-width: 100%; height: auto;" />
         </div>
         <p style="padding: 0 24px;">Nach der Installation können Sie Ihre eSIM aktivieren. Beachten Sie, dass dieser Schritt bis zu 4 Minuten dauern kann und nur nach Ihrer Ankunft am Zielort erfolgen sollte.</p>
         <table cellpadding="0" cellspacing="0" border="0" width="100%">
             <tr>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Gehen Sie zu den Einstellungen auf Ihrem Gerät.</p>
                 </td>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Wählen Sie Ihre ViajareSIM eSIM aus.</p>
                 </td>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Aktivieren Sie das Daten-Roaming.</p>
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
                         <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Wir empfehlen, eine stabile WLAN-Verbindung zu nutzen, um eine reibungslose Installation zu gewährleisten.</p>
                     </td>
                 </tr>
             </table>
         </div>
     </div>
     <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 12px 24px; text-align: center; margin-top: 20px;">
         <h2>Installieren Sie Ihre <span style="color: #6C85FF; font-weight: bold;">eSIM mit dem QR-Code</span></h2>
         <p style="padding: 0 12px;">Scannen Sie den QR-Code in den Einstellungen Ihres Mobilgeräts. Sie können ihn vor oder während Ihrer Reise installieren.</p>
         <img src="${qrcode}" alt="QR-Code" style="max-width: 100%; height: auto;" />
         <div style="margin-top: 20px;">
             <h4 style="font-weight: 600; margin-bottom: 0;">Oder manuell installieren</h4>
             <p style="margin-top: 5px;">Finden Sie den Code für Ihr Betriebssystem unten. Detaillierte Anweisungen finden Sie auf unserer Website oder in den PDF-Leitfäden.</p>
         </div>
     </div>
     <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
         <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
             <h4 style="text-align: center">Für Apple</h4>
             <img style="display: block; margin: 0 auto;" src='cid:appleLogo.png' alt='Apple-Logo' width='40' height='50' />
             <h4 style="margin-bottom: 0;">SM-DP+ Adresse</h4>
             <p style="margin-top: 5px;">${smdpAddress}</p>
             <h4 style="margin-bottom: 0;">Aktivierungscode</h4>
             <p style="word-break: break-all; margin-top: 5px;">${activationCodeIos}</p>
             <h4 style="margin-bottom: 0;">Sie können die eSIM auch über unseren Bereitstellungslink installieren:</h4>
             <p style="margin-top: 5px;">${'https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=' + activationCodeAndroid}</p>
         </div>
     </div>
     <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
         <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
         <h4 style="text-align: center">Für Android</h4>
             <img style="display: block; margin: 0 auto;" src='cid:androidLogo.png' alt='Android-Logo' width='33' height='41' />
             <h4 style="margin-bottom: 0;">Aktivierungscode:</h4>
             <p style="word-break: break-all; margin-top: 5px;">${activationCodeAndroid}</p>
         </div>
     </div>
     <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:  #E2FFF6; text-align: center; position: relative; margin-top: 20px;">
         <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Brauchen Sie Hilfe?</h1>
         <p>Zögern Sie nicht, uns bei Fragen zu kontaktieren.</p>
         <p>Geben Sie diese Nummer an, wenn Sie den Support kontaktieren, um diese eSIM zu identifizieren: ${iccid}</p>
         <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
             <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Zum Hilfecenter</span>
         </a>
     </div>
     <div style="padding: 24px; text-align: center; margin-top: 20px; margin-bottom: 12px;">
         <div style="padding-bottom: 16px;">
             <a href="https://viajaresim.com" style="text-decoration: none; color: black;">
                 <div style="display: inline-block; font-size: 1.25rem; font-family: 'Poppins', sans-serif;">
                     <img src="cid:favicon.png" alt="ViajareSIM-Logo" width="36" height="36" style="vertical-align: middle;" />
                     <span style="font-weight: 600; font-size: 1.25rem; vertical-align: middle;">ViajareSIM</span>
                 </div>
             </a>
         </div>
     </div>
 </div>`}
 