import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation";

export function englishText(emailInfo : EmailInformation){return `ViajareSIM

Order ${emailInfo.orderNumber}

${emailInfo.userFirstName} ${emailInfo.userLastName}, your eSIM is ready

${emailInfo.regionName}
Data: ${emailInfo.data}
Duration: ${emailInfo.duration === '1' ? emailInfo.duration + ' Day' : emailInfo.duration + ' Days'}

1. Install your eSIM

Please pay close attention to the following information.

You can install it before or during your trip by using the QR code below or by entering the manual codes provided in this email.

- Go to Settings on your device.
- Scan the QR code or copy and paste the manual codes.
- Set up your eSIM.

We recommend connecting to a stable Wi-Fi network to ensure a smooth and successful installation process.

Discover step-by-step instructions on our website.

[Go to eSIM installation]

2. Activate your eSIM

Once the installation is complete, you will be ready to activate your eSIM. Please note that this step may take up to 4 minutes and should only be performed once you have reached your destination.

- Go to Settings on your device.
- Select your ViajareSIM eSIM.
- Turn on data roaming.

We recommend connecting to a stable Wi-Fi network to ensure a smooth and successful installation process.

Install your eSIM with a QR code

Scan the QR code from the Settings on your mobile device. Please note you can install it before or during your trip.

Or install manually

Find the code for your operating system below. Remember that detailed steps are available on the website or in the PDF guides.

For Apple

SM-DP+ Address: ${emailInfo.smdpAddress}
Activation Code: ${emailInfo.activationCodeIos}
Confirmation Code: Not required

For Android

Activation Code: ${emailInfo.activationCodeAndroid}

Need help with an issue?

Don't hesitate to contact us with any questions.

[Go to help center]

ViajareSIM`;
}
