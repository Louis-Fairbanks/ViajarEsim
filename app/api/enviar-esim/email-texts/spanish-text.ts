import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation";

export function spanishText(emailInfo : EmailInformation){return `ViajareSIM

Order ${emailInfo.orderNumber}

${emailInfo.userFirstName} ${emailInfo.userLastName} tu eSIM esta lista

${emailInfo.regionName}
Datos: ${emailInfo.data}
Duración: ${emailInfo.duration === '1' ? emailInfo.duration + ' Día' : emailInfo.duration + ' Días'}

1. Instala tu eSIM

Por favor, préstale mucha atención a la siguiente información.

Puedes instalarlo antes o durante tu viaje utilizando el código QR a continuación o ingresando los códigos manualmente que se encuentran en este correo electrónico.

- Ve a Ajustes en tu dispositivo.
- Escanea el código QR o copia y pega los códigos manualmente.
- Configura tu eSIM

Te recomendamos conectarte a una red Wi-Fi estable para asegurar un proceso de instalación exitoso y sencillo.

Descubre instrucciones paso a paso en nuestro sitio web.

[Ir a instalación de eSIM]

2. Activa tu eSIM

Una vez completada la instalación, estarás listo para activar tu eSIM. Ten en cuenta que este paso puede tardar hasta 4 minutos y debe realizarse únicamente cuando hayas llegado a tu destino.

- Ve a Ajustes en tu dispositivo.
- Selecciona tu ViajareSIM eSIM.
- Prende los datos roaming.

Te recomendamos conectarte a una red Wi-Fi estable para asegurar un proceso de instalación exitoso y sencillo.

Instala tu eSIM con código QR

Escanea el código QR desde la Configuración de tu dispositivo móvil. Ten en cuenta que puedes instalarla antes o durante tu viaje.

O instala manualmente

Encuentra el código para tu sistema operativo correspondiente justo abajo. Recuerda que los pasos detallados están en el sitio web o en las guías en PDF.

Para Apple

Dirección SM-DP+: ${emailInfo.smdpAddress}
Código de activación: ${emailInfo.activationCodeIos}
Código de confirmación: No requerido

Para Android

Código de activación: ${emailInfo.activationCodeAndroid}

¿Necesitas ayuda con algun problema?

No dudes en contactarnos ante cualquier inquietud.

[Ir a centro de ayuda]

ViajareSIM`;
}