import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation";

export function orderEmailItalian({userFirstName, userLastName, orderNumber, regionName, data, duration, qrcode, smdpAddress, activationCodeIos, activationCodeAndroid, iccid} : EmailInformation){ return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
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
                    Ordine ${orderNumber}
                </div>
            </div>
        </div>
    </div>
    <div style="overflow:hidden; border-radius: 8px; max-width: 100%; margin-top: 16px; border: 2px solid #E4E4E4; padding: 0 24px; position: relative;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="padding-top: 24px; padding-bottom: 24px; width: 50%;">
                    <div>${userFirstName} ${userLastName}, la tua <br><span style="font-weight: bold;">eSIM</span> è pronta</div>
                    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 18px; margin-top: 12px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                                <td style="font-weight: 500;">${regionName}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 500; color: #898989;">Dati</td>
                                <td style="font-weight: 600; text-align: right;">${data}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 500; color: #898989;">Durata</td>
                                <td style="font-weight: 600; text-align: right;">${duration === '1' ? duration + ' Giorno' : duration + ' Giorni'}</td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td style="width: 50%; text-align: right; vertical-align: top;">
                    <img src="cid:mujer-llamando.png" alt="donna che chiama" width="300" height="200" style="max-width: 100%; height: auto;" />
                </td>
            </tr>
        </table>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
        <div style="display: inline-block; text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                    <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">1.</td>
                    <td><h2 style="margin: 0;">Installa la tua <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                </tr>
            </table>
            <p>Presta molta attenzione alle seguenti informazioni.</p>
        </div>
        <div style="position: relative;">
            <img src='cid:hombre-con-celular.png' alt='telefono con esim' height="157" width="228" style="max-width: 100%; height: auto;" />
        </div>
        <p style="padding: 0 24px;">Puoi installarla prima o durante il tuo viaggio utilizzando il codice QR qui sotto o inserendo i codici manuali trovati in questa email.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Vai su Impostazioni sul tuo dispositivo.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Scansiona il codice QR o copia e incolla i codici manuali.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Configura la tua eSIM</p>
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
                        <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Ti consigliamo di collegarti a una rete Wi-Fi stabile per garantire un processo di installazione fluido e senza problemi.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:#E2E7FF; text-align: center; position: relative; margin-top: 20px;">
        <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Scopri le istruzioni passo-passo sul nostro sito web.</h1>
        <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
            <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Vai all'installazione eSIM</span>
        </a>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
        <div style="display: inline-block; text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                    <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">2.</td>
                    <td><h2 style="margin: 0;">Attiva la tua <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                </tr>
            </table>
        </div>
        <div style="position: relative;">
            <img src='cid:checklist.png' alt='telefono con esim' height="157" width="228" style="max-width: 100%; height: auto;" />
        </div>
        <p style="padding: 0 24px;">Una volta completata l'installazione, sarai pronto per attivare la tua eSIM. Si prega di notare che questo passaggio potrebbe richiedere fino a 4 minuti e dovrebbe essere eseguito solo una volta arrivato a destinazione.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Vai su Impostazioni sul tuo dispositivo.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Seleziona la tua eSIM ViajareSIM.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Attiva il roaming dati.</p>
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
                        <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Ti consigliamo di collegarti a una rete Wi-Fi stabile per garantire un processo di installazione fluido e senza problemi.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 12px 24px; text-align: center; margin-top: 20px;">
        <h2>Installa la tua <span style="color: #6C85FF; font-weight: bold;">eSIM con codice QR</span></h2>
        <p style="padding: 0 12px;">Scansiona il codice QR dalle Impostazioni sul tuo dispositivo mobile. Tieni presente che puoi installarlo prima o durante il viaggio.</p>
        <img src="${qrcode}" alt="Codice QR" style="max-width: 100%; height: auto;" />
        <div style="margin-top: 20px;">
            <h4 style="font-weight: 600; margin-bottom: 0;">Oppure installa manualmente</h4>
            <p style="margin-top: 5px;">Trova il codice per il tuo sistema operativo qui sotto. Ricorda, i passaggi dettagliati sono disponibili sul nostro sito web o nelle guide PDF.</p>
        </div>
    </div>
    <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
        <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
            <h4 style="text-align: center">Per Apple</h4>
            <img style="display: block; margin: 0 auto;" src='cid:appleLogo.png' alt='logo apple' width='40' height='50' />
            <h4 style="margin-bottom: 0;">Indirizzo SM-DP+</h4>
            <p style="margin-top: 5px;">${smdpAddress}</p>
            <h4 style="margin-bottom: 0;">Codice di Attivazione</h4>
            <p style="word-break: break-all; margin-top: 5px;">${activationCodeIos}</p>
            <h4 style="margin-bottom: 0;">Puoi anche provare a installare l'eSIM con il nostro link di provisioning:</h4>
            <p style="margin-top: 5px;">${'https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=' + activationCodeAndroid}</p>
        </div>
    </div>
    <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
        <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
        <h4 style="text-align: center">Per Android</h4>
            <img style="display: block; margin: 0 auto;" src='cid:androidLogo.png' alt='logo android' width='33' height='41' />
            <h4 style="margin-bottom: 0;">Codice di Attivazione:</h4>
            <p style="word-break: break-all; margin-top: 5px;">${activationCodeAndroid}</p>
        </div>
    </div>
    <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:  #E2FFF6; text-align: center; position: relative; margin-top: 20px;">
        <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Hai bisogno di aiuto?</h1>
        <p>Non esitare a contattarci per qualsiasi domanda.</p>
        <p>Usa questo numero quando contatti il supporto per aiutarti a identificare questa eSIM: ${iccid}</p>
        <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
            <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Vai al centro assistenza</span>
        </a>
    </div>
    <div style="padding: 24px; text-align: center; margin-top: 20px; margin-bottom: 12px;">
        <div style="padding-bottom: 16px;">
            <a href="https://viajaresim.com" style="text-decoration: none; color: black;">
                <div style="display: inline-block; font-size: 1.25rem; font-family: 'Poppins', sans-serif;">
                    <img src="cid:favicon.png" alt="viajar esim logo" width="36" height="36" style="vertical-align: middle;" />
                    <span style="font-weight: 600; font-size: 1.25rem; vertical-align: middle;">ViajareSIM</span>
                </div>
            </a>
        </div>
    </div>
</div>`}