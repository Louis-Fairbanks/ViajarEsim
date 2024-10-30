import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation";

export function orderEmailPortuguese({userFirstName, userLastName, orderNumber, regionName, data, duration,
   qrcode, smdpAddress, activationCodeIos, activationCodeAndroid, iccid } : EmailInformation) {
   return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
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
                    Pedido ${orderNumber}
                </div>
            </div>
        </div>
    </div>
    <div style="overflow:hidden; border-radius: 8px; max-width: 100%; margin-top: 16px; border: 2px solid #E4E4E4; padding: 0 24px; position: relative;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="padding-top: 24px; padding-bottom: 24px; width: 50%;">
                    <div>${userFirstName} ${userLastName}, sua <br><span style="font-weight: bold;">eSIM</span> está pronta</div>
                    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 18px; margin-top: 12px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                                <td style="font-weight: 500;">${regionName}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 500; color: #898989;">Dados</td>
                                <td style="font-weight: 600; text-align: right;">${data}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 500; color: #898989;">Duração</td>
                                <td style="font-weight: 600; text-align: right;">${duration === '1' ? duration + ' Dia' : duration + ' Dias'}</td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td style="width: 50%; text-align: right; vertical-align: top;">
                    <img src="cid:mujer-llamando.png" alt="mulher fazendo ligação" width="300" height="200" style="max-width: 100%; height: auto;" />
                </td>
            </tr>
        </table>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
        <div style="display: inline-block; text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                    <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">1.</td>
                    <td><h2 style="margin: 0;">Instale sua <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                </tr>
            </table>
            <p>Por favor, preste muita atenção às seguintes informações.</p>
        </div>
        <div style="position: relative;">
            <img src='cid:hombre-con-celular.png' alt='telefone com esim' height="157" width="228" style="max-width: 100%; height: auto;" />
        </div>
        <p style="padding: 0 24px;">Você pode instalá-la antes ou durante sua viagem usando o código QR abaixo ou inserindo os códigos manuais encontrados neste e-mail.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Vá para Configurações no seu dispositivo.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Escaneie o código QR ou copie e cole os códigos manuais.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Configure sua eSIM</p>
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
                        <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Recomendamos que se conecte a uma rede Wi-Fi estável para garantir um processo de instalação bem-sucedido e tranquilo.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:#E2E7FF; text-align: center; position: relative; margin-top: 20px;">
        <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Descubra as instruções passo a passo em nosso site.</h1>
        <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
            <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Ir para instalação de eSIM</span>
        </a>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 24px; text-align: center; margin-top: 20px;">
        <div style="display: inline-block; text-align: center;">
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                    <td style="font-weight: 800; font-size: 3rem; color: #E4E4E4; padding-right: 24px;">2.</td>
                    <td><h2 style="margin: 0;">Ative sua <span style="color: #6C85FF; font-weight: bold;">eSIM</span></h2></td>
                </tr>
            </table>
        </div>
        <div style="position: relative;">
            <img src='cid:checklist.png' alt='telefone com esim' height="157" width="228" style="max-width: 100%; height: auto;" />
        </div>
        <p style="padding: 0 24px;">Uma vez concluída a instalação, você estará pronto para ativar sua eSIM. Lembre-se de que este passo pode demorar até 4 minutos e deve ser realizado apenas quando você chegar ao seu destino.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:settings.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Vá para Configurações no seu dispositivo.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:sim_card.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Selecione sua eSIM ViajareSIM.</p>
                </td>
                <td style="width: 33%; text-align: center; vertical-align: top;">
                    <img src='cid:qr_code_scanner.png' alt='' width='48' height='48' style="margin-bottom: 12px;" />
                    <p style="margin: 0;">Ative o roaming de dados.</p>
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
                        <p style="color: #6C85FF; font-weight: 600; font-size: 0.75rem; margin: 0;">Recomendamos que se conecte a uma rede Wi-Fi estável para garantir um processo de instalação bem-sucedido e tranquilo.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div style="border-radius: 8px; border: 2px solid #E4E4E4; padding: 12px 24px; text-align: center; margin-top: 20px;">
        <h2>Instale sua <span style="color: #6C85FF; font-weight: bold;">eSIM com código QR</span></h2>
        <p style="padding: 0 12px;">Escaneie o código QR nas Configurações do seu dispositivo móvel. Lembre-se de que você pode instalá-la antes ou durante sua viagem.</p>
        <img src="${qrcode}" alt="Código QR" style="max-width: 100%; height: auto;" />
        <div style="margin-top: 20px;">
            <h4 style="font-weight: 600; margin-bottom: 0;">Ou instale manualmente</h4>
            <p style="margin-top: 5px;">Encontre o código para o seu sistema operacional logo abaixo. Lembre-se, os passos detalhados estão disponíveis em nosso site ou nos guias em PDF.</p>
        </div>
    </div>
    <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
        <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
            <h4 style="text-align: center">Para Apple</h4>
            <img style="display: block; margin: 0 auto;" src='cid:appleLogo.png' alt='logo da Apple' width='40' height='50' />
            <h4 style="margin-bottom: 0;">Endereço SM-DP+</h4>
            <p style="margin-top: 5px;">${smdpAddress}</p>
            <h4 style="margin-bottom: 0;">Código de ativação</h4>
            <p style="word-break: break-all; margin-top: 5px;">${activationCodeIos}</p>
            <h4 style="margin-bottom: 0;">Você também pode tentar instalar o eSIM com nosso link de provisionamento:</h4>
            <p style="margin-top: 5px;">${'https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=' + activationCodeAndroid}</p>
        </div>
    </div>
    <div style="width: 100%; margin-top: 12px; box-sizing: border-box;">
        <div style="border: 2px solid #E4E4E4; border-radius: 8px; padding: 24px;">
        <h4 style="text-align: center">Para Android</h4>
            <img style="display: block; margin: 0 auto;" src='cid:androidLogo.png' alt='logo do Android' width='33' height='41' />
            <h4 style="margin-bottom: 0;">Código de ativação:</h4>
            <p style="word-break: break-all; margin-top: 5px;">${activationCodeAndroid}</p>
        </div>
    </div>
    <div style="overflow: hidden; border-radius: 8px; padding: 24px; background:  #E2FFF6; text-align: center; position: relative; margin-top: 20px;">
        <h1 style="font-weight: 600; font-size: 1.25rem; line-height: 1.5;">Precisa de ajuda com algum problema?</h1>
        <p>Não hesite em nos contatar caso tenha alguma dúvida.</p>
        <p>Em caso de necessitar ajuda, informe este número ao suporte para ajudá-los a identificar este eSIM: ${iccid}</p>
        <a href="https://viajaresim.com/que-es-una-esim" style="text-decoration: none;">
            <span style="display: inline-block; padding: 12px 32px; background-color: #6C85FF; color: #FFFFFF; border-radius: 8px; margin-top: 20px;">Ir para o centro de ajuda</span>
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
</div>`;
}
