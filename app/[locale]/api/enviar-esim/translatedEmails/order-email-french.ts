import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation"

export function orderEmailFrench ({userFirstName, userLastName, orderNumber, regionName, data, duration,
    qrcode, smdpAddress, activationCodeIos, activationCodeAndroid, iccid } : EmailInformation){ return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
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
                     Commande ${orderNumber}
                 </div>
             </div>
         </div>
     </div>
     <div style="overflow:hidden; border-radius: 8px; max-width: 100%; margin-top: 16px; border: 2px solid #E4E4E4; padding: 0 24px; position: relative;">
         <table cellpadding="0" cellspacing="0" border="0" width="100%">
             <tr>
                 <td style="padding-top: 24px; padding-bottom: 24px; width: 50%;">
                     <div>${userFirstName} ${userLastName}, votre <br><span style="font-weight: bold;">eSIM</span> est prête</div>
                     <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 18px; margin-top: 12px;">
                         <table cellpadding="0" cellspacing="0" border="0" width="100%">
                             <tr>
                                 <td style="font-weight: 500;">${regionName}</td>
                             </tr>
                             <tr>
                                 <td style="font-weight: 500; color: #898989;">Données</td>
                                 <td style="font-weight: 600; text-align: right;">${data}</td>
                             </tr>
                             <tr>
                                 <td style="font-weight: 500; color: #898989;">Durée</td>
                                 <td style="font-weight: 600; text-align: right;">${duration === '1' ? duration + ' Jour' : duration + ' Jours'}</td>
                             </tr>
                         </table>
                     </div>
                 </td>
                 <td style="width: 50%; text-align: right; vertical-align: top;">
                     <img src="cid:mujer-llamando.png" alt="femme appelant" width="300" height="200" style="max-width: 100%; height: auto;" />
                 </td>
             </tr>
         </table>
     </div>
     <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
         <div style="display: inline-block; text-align: center;">
             <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                 <tr>
                     <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">1.</td>
                     <td><h2 style="margin: 0;">Installez votre <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                 </tr>
             </table>
             <p>Veuillez prêter une attention particulière aux informations suivantes.</p>
         </div>
         <div style="position: relative;">
             <img src='cid:hombre-con-celular.png' alt='téléphone avec esim' height="157" width="228" style="max-width: 100%; height: auto;" />
         </div>
         <p style="padding: 0 24px;">Vous pouvez l'installer avant ou pendant votre voyage en utilisant le code QR ci-dessous ou en entrant les codes manuels trouvés dans cet email.</p>
         <table cellpadding="0" cellspacing="0" border="0" width="100%">
             <tr>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Allez dans Paramètres sur votre appareil.</p>
                 </td>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Scannez le code QR ou copiez et collez les codes manuels.</p>
                 </td>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Configurez votre eSIM</p>
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
                         <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Nous recommandons de se connecter à un réseau Wi-Fi stable pour assurer une installation réussie et fluide.</p>
                     </td>
                 </tr>
             </table>
         </div>
     </div>
     <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:#E2E7FF; text-align: center; position: relative; margin-top: 20px;">
         <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Découvrez les instructions étape par étape sur notre site.</h1>
         <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
             <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Accéder à l'installation de l'eSIM</span>
         </a>
     </div>
     <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
         <div style="display: inline-block; text-align: center;">
             <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                 <tr>
                     <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">2.</td>
                     <td><h2 style="margin: 0;">Activez votre <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                 </tr>
             </table>
         </div>
         <div style="position: relative;">
             <img src='cid:checklist.png' alt='téléphone avec esim' height="157" width="228" style="max-width: 100%; height: auto;" />
         </div>
         <p style="padding: 0 24px;">Une fois l'installation terminée, vous serez prêt à activer votre eSIM. Notez que cette étape peut prendre jusqu'à 4 minutes et doit être effectuée uniquement après votre arrivée à destination.</p>
         <table cellpadding="0" cellspacing="0" border="0" width="100%">
             <tr>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Allez dans Paramètres sur votre appareil.</p>
                 </td>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Sélectionnez votre eSIM ViajareSIM.</p>
                 </td>
                 <td style="width: 33%; text-align: center; vertical-align: top;">
                     <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                     <p style="margin: 0;">Activez l'itinérance des données.</p>
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
                         <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Nous recommandons de se connecter à un réseau Wi-Fi stable pour assurer une installation réussie et fluide.</p>
                     </td>
                 </tr>
             </table>
         </div>
     </div>
     <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 12px 24px; text-align: center; margin-top: 20px;">
         <h2>Installez votre <span style="color: #6C85FF; font-weight: bold;">eSIM avec le code QR</span></h2>
         <p style="padding: 0 12px;">Scannez le code QR depuis les paramètres de votre appareil mobile. Notez que vous pouvez l'installer avant ou pendant votre voyage.</p>
         <img src="${qrcode}" alt="Code QR" style="max-width: 100%; height: auto;" />
         <div style="margin-top: 20px;">
             <h4 style="font-weight: 600; margin-bottom: 0;">Ou installez-le manuellement</h4>
             <p style="margin-top: 5px;">Trouvez le code pour votre système d'exploitation ci-dessous. Rappelez-vous que des étapes détaillées sont disponibles sur notre site ou dans les guides PDF.</p>
         </div>
     </div>
     <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
         <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
             <h4 style="text-align: center">Pour Apple</h4>
             <img style="display: block; margin: 0 auto;" src='cid:appleLogo.png' alt='logo apple' width='40' height='50' />
             <h4 style="margin-bottom: 0;">Adresse SM-DP+</h4>
             <p style="margin-top: 5px;">${smdpAddress}</p>
             <h4 style="margin-bottom: 0;">Code d'activation</h4>
             <p style="word-break: break-all; margin-top: 5px;">${activationCodeIos}</p>
             <h4 style="margin-bottom: 0;">Vous pouvez également essayer d'installer l'eSIM avec notre lien de provisionnement:</h4>
             <p style="margin-top: 5px;">${'https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=' + activationCodeAndroid}</p>
         </div>
     </div>
     <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
         <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
         <h4 style="text-align: center">Pour Android</h4>
             <img style="display: block; margin: 0 auto;" src='cid:androidLogo.png' alt='logo android' width='33' height='41' />
             <h4 style="margin-bottom: 0;">Code d'activation :</h4>
             <p style="word-break: break-all; margin-top: 5px;">${activationCodeAndroid}</p>
         </div>
     </div>
     <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:  #E2FFF6; text-align: center; position: relative; margin-top: 20px;">
         <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Besoin d'aide avec des problèmes ?</h1>
         <p>N'hésitez pas à nous contacter pour toute question.</p>
         <p>Utilisez ce numéro lors de la prise de contact avec le support pour les aider à identifier cette eSIM : ${iccid}</p>
         <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
             <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Accéder au centre d'aide</span>
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
 