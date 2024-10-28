import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation";

export function frenchText(emailInfo : EmailInformation){return `ViajareSIM

Commande ${emailInfo.orderNumber}

${emailInfo.userFirstName} ${emailInfo.userLastName}, votre eSIM est prête

${emailInfo.regionName}
Données : ${emailInfo.data}
Durée : ${emailInfo.duration === '1' ? emailInfo.duration + ' Jour' : emailInfo.duration + ' Jours'}

1. Installez votre eSIM

Veuillez prêter une attention particulière aux informations suivantes.

Vous pouvez l'installer avant ou pendant votre voyage en utilisant le code QR ci-dessous ou en entrant les codes manuels fournis dans cet email.

- Allez dans les paramètres de votre appareil.
- Scannez le code QR ou copiez et collez les codes manuels.
- Configurez votre eSIM.

Nous recommandons de vous connecter à un réseau Wi-Fi stable pour assurer un processus d'installation fluide et réussi.

Découvrez les instructions étape par étape sur notre site web.

[Aller à l'installation eSIM]

2. Activez votre eSIM

Une fois l'installation terminée, vous pourrez activer votre eSIM. Veuillez noter que cette étape peut prendre jusqu'à 4 minutes et doit être effectuée uniquement après votre arrivée à destination.

- Allez dans les paramètres de votre appareil.
- Sélectionnez votre eSIM ViajareSIM.
- Activez l'itinérance des données.

Nous recommandons de vous connecter à un réseau Wi-Fi stable pour assurer un processus d'installation fluide et réussi.

Installez votre eSIM avec un code QR

Scannez le code QR dans les paramètres de votre appareil mobile. Veuillez noter que vous pouvez l'installer avant ou pendant votre voyage.

Ou installez-la manuellement

Trouvez le code correspondant à votre système d'exploitation ci-dessous. N'oubliez pas que des étapes détaillées sont disponibles sur le site web ou dans les guides PDF.

Pour Apple

Adresse SM-DP+ : ${emailInfo.smdpAddress}
Code d'activation : ${emailInfo.activationCodeIos}
Code de confirmation : Non requis

Pour Android

Code d'activation : ${emailInfo.activationCodeAndroid}

Besoin d'aide avec un problème ?

N'hésitez pas à nous contacter si vous avez des questions.
Utilisez ce numéro lorsque vous contactez le support pour les aider à identifier cette eSIM : ${emailInfo.iccid}

[Aller au centre d'aide]

ViajareSIM`;}
