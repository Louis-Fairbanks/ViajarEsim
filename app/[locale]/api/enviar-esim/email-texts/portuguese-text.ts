import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation";

export function portugueseText(emailInfo: EmailInformation) {
  return `ViajareSIM

Pedido ${emailInfo.orderNumber}

${emailInfo.userFirstName} ${emailInfo.userLastName}, sua eSIM está pronta

${emailInfo.regionName}
Dados: ${emailInfo.data}
Duração: ${emailInfo.duration === '1' ? emailInfo.duration + ' Dia' : emailInfo.duration + ' Dias'}

1. Instale sua eSIM

Por favor, preste muita atenção às informações a seguir.

Você pode instalá-la antes ou durante a sua viagem utilizando o código QR abaixo ou inserindo os códigos manualmente que estão neste e-mail.

- Vá para Configurações no seu dispositivo.
- Escaneie o código QR ou copie e cole os códigos manualmente.
- Configure sua eSIM

Recomendamos que se conecte a uma rede Wi-Fi estável para garantir um processo de instalação bem-sucedido e simples.

Veja as instruções passo a passo no nosso site.

[Ir para instalação de eSIM]

2. Ative sua eSIM

Uma vez concluída a instalação, você estará pronto para ativar sua eSIM. Lembre-se de que este passo pode demorar até 4 minutos e deve ser realizado apenas quando você chegar ao seu destino.

- Vá para Configurações no seu dispositivo.
- Selecione sua eSIM ViajareSIM.
- Ative os dados roaming.

Recomendamos que se conecte a uma rede Wi-Fi estável para garantir um processo de instalação bem-sucedido e simples.

Instale sua eSIM com código QR

Escaneie o código QR nas Configurações do seu dispositivo móvel. Lembre-se de que você pode instalá-la antes ou durante sua viagem.

Ou instale manualmente

Encontre o código para o seu sistema operacional logo abaixo. Lembre-se de que os passos detalhados estão no site ou nos guias em PDF.

Para Apple

Endereço SM-DP+: ${emailInfo.smdpAddress}
Código de ativação: ${emailInfo.activationCodeIos}
Código de confirmação: Não é necessário

Para Android

Código de ativação: ${emailInfo.activationCodeAndroid}

Precisa de ajuda com algum problema?

Não hesite em nos contatar caso tenha qualquer dúvida.
Em caso de necessitar ajuda, informe este número ao suporte para ajudá-los a identificar este eSIM: ${emailInfo.iccid}

[Ir para o centro de ajuda]

ViajareSIM`;
}
