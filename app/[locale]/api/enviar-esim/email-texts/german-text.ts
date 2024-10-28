import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation";

export function germanText(emailInfo : EmailInformation){return `ViajareSIM

Bestellung ${emailInfo.orderNumber}

${emailInfo.userFirstName} ${emailInfo.userLastName}, Ihre eSIM ist bereit

${emailInfo.regionName}
Daten: ${emailInfo.data}
Dauer: ${emailInfo.duration === '1' ? emailInfo.duration + ' Tag' : emailInfo.duration + ' Tage'}

1. Installieren Sie Ihre eSIM

Bitte beachten Sie die folgenden Informationen sorgfältig.

Sie können sie vor oder während Ihrer Reise installieren, indem Sie den untenstehenden QR-Code verwenden oder die in dieser E-Mail bereitgestellten manuellen Codes eingeben.

- Gehen Sie zu den Einstellungen auf Ihrem Gerät.
- Scannen Sie den QR-Code oder kopieren und fügen Sie die manuellen Codes ein.
- Richten Sie Ihre eSIM ein.

Wir empfehlen, eine stabile WLAN-Verbindung zu nutzen, um eine reibungslose und erfolgreiche Installation sicherzustellen.

Erfahren Sie Schritt-für-Schritt-Anleitungen auf unserer Website.

[Zur eSIM-Installation]

2. Aktivieren Sie Ihre eSIM

Nach Abschluss der Installation können Sie Ihre eSIM aktivieren. Beachten Sie, dass dieser Schritt bis zu 4 Minuten dauern kann und nur nach Ihrer Ankunft am Zielort durchgeführt werden sollte.

- Gehen Sie zu den Einstellungen auf Ihrem Gerät.
- Wählen Sie Ihre ViajareSIM eSIM.
- Aktivieren Sie das Daten-Roaming.

Wir empfehlen, eine stabile WLAN-Verbindung zu nutzen, um eine reibungslose und erfolgreiche Installation sicherzustellen.

Installieren Sie Ihre eSIM mit einem QR-Code

Scannen Sie den QR-Code in den Einstellungen auf Ihrem Mobilgerät. Beachten Sie, dass Sie ihn vor oder während Ihrer Reise installieren können.

Oder manuell installieren

Finden Sie den Code für Ihr Betriebssystem unten. Detaillierte Anweisungen finden Sie auf der Website oder in den PDF-Anleitungen.

Für Apple

SM-DP+ Adresse: ${emailInfo.smdpAddress}
Aktivierungscode: ${emailInfo.activationCodeIos}
Bestätigungscode: Nicht erforderlich

Für Android

Aktivierungscode: ${emailInfo.activationCodeAndroid}

Brauchen Sie Hilfe bei einem Problem?

Zögern Sie nicht, uns bei Fragen zu kontaktieren.
Verwenden Sie diese Nummer, wenn Sie den Support kontaktieren, um diese eSIM zu identifizieren: ${emailInfo.iccid}

[Zum Hilfecenter]

ViajareSIM`;}
