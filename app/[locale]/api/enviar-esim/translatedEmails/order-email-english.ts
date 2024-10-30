import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation"

export function orderEmailEnglish ({userFirstName, userLastName, orderNumber, regionName, data, duration,
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
                    Order ${orderNumber}
                </div>
            </div>
        </div>
    </div>
    <div style="overflow:hidden; border-radius: 8px; max-width: 100%; margin-top: 16px; border: 2px solid #E4E4E4; padding: 0 24px; position: relative;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="padding-top: 24px; padding-bottom: 24px; width: 50%;">
                    <div>${userFirstName} ${userLastName}, your <br><span style="font-weight: bold;">eSIM</span> is ready</div>
                    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 18px; margin-top: 12px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                                <td style="font-weight: 500;">${regionName}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 500; color: #898989;">Data</td>
                                <td style="font-weight: 600; text-align: right;">${data}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 500; color: #898989;">Duration</td>
                                <td style="font-weight: 600; text-align: right;">${duration === '1' ? duration + ' Day' : duration + ' Days'}</td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td style="width: 50%; text-align: right; vertical-align: top;">
                    <img src="cid:mujer-llamando.png" alt="woman calling" width="300" height="200" style="max-width: 100%; height: auto;" />
                </td>
            </tr>
        </table>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
        <div style="display: inline-block; text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                    <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">1.</td>
                    <td><h2 style="margin: 0;">Install your <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                </tr>
            </table>
            <p>Please pay close attention to the following information.</p>
        </div>
        <div style="position: relative;">
            <img src='cid:hombre-con-celular.png' alt='phone with esim' height="157" width="228" style="max-width: 100%; height: auto;" />
        </div>
        <p style="padding: 0 24px;">You can install it before or during your trip using the QR code below or entering the manual codes found in this email.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Go to Settings on your device.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Scan the QR code or copy and paste the manual codes.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Set up your eSIM</p>
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
                        <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">We recommend connecting to a stable Wi-Fi network to ensure a smooth and successful installation process.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:#E2E7FF; text-align: center; position: relative; margin-top: 20px;">
        <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Discover step-by-step instructions on our website.</h1>
        <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
            <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Go to eSIM installation</span>
        </a>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
        <div style="display: inline-block; text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                    <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">2.</td>
                    <td><h2 style="margin: 0;">Activate your <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                </tr>
            </table>
        </div>
        <div style="position: relative;">
            <img src='cid:checklist.png' alt='phone with esim' height="157" width="228" style="max-width: 100%; height: auto;" />
        </div>
        <p style="padding: 0 24px;">Once the installation is complete, you will be ready to activate your eSIM. Please note that this step may take up to 4 minutes and should only be done once you have arrived at your destination.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Go to Settings on your device.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Select your ViajareSIM eSIM.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Turn on data roaming.</p>
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
                        <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">We recommend connecting to a stable Wi-Fi network to ensure a smooth and successful installation process.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 12px 24px; text-align: center; margin-top: 20px;">
        <h2>Install your <span style="color: #6C85FF; font-weight: bold;">eSIM with QR code</span></h2>
        <p style="padding: 0 12px;">Scan the QR code from the Settings on your mobile device. Please note you can install it before or during your trip.</p>
        <img src="${qrcode}" alt="QR Code" style="max-width: 100%; height: auto;" />
        <div style="margin-top: 20px;">
            <h4 style="font-weight: 600; margin-bottom: 0;">Or install manually</h4>
            <p style="margin-top: 5px;">Find the code for your operating system below. Remember, detailed steps are available on our website or in the PDF guides.</p>
        </div>
    </div>
    <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
        <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
            <h4 style="text-align: center">For Apple</h4>
            <img style="display: block; margin: 0 auto;" src='cid:appleLogo.png' alt='apple logo' width='40' height='50' />
            <h4 style="margin-bottom: 0;">SM-DP+ Address</h4>
            <p style="margin-top: 5px;">${smdpAddress}</p>
            <h4 style="margin-bottom: 0;">Activation Code</h4>
            <p style="word-break: break-all; margin-top: 5px;">${activationCodeIos}</p>
            <h4 style="margin-bottom: 0;">You can also try installing the eSIM with this link:</h4>
            <p style="margin-top: 5px;">${'https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=' + activationCodeAndroid}</p>
        </div>
    </div>
    <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
        <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
        <h4 style="text-align: center">For Android</h4>
            <img style="display: block; margin: 0 auto;" src='cid:androidLogo.png' alt='android logo' width='33' height='41' />
            <h4 style="margin-bottom: 0;">Activation Code:</h4>
            <p style="word-break: break-all; margin-top: 5px;">${activationCodeAndroid}</p>
        </div>
    </div>
    <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:  #E2FFF6; text-align: center; position: relative; margin-top: 20px;">
        <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Need help with any issues?</h1>
        <p>Do not hesitate to contact us with any questions.</p>
        <p>Use this number when contacting support to help them to identify this eSIM: ${iccid}</p>
        <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
            <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Go to help center</span>
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
