import { EmailInformation } from "@/app/[locale]/components/Types/TEmailInformation";

export function italianText(emailInfo : EmailInformation){return `ViajareSIM

Ordine ${emailInfo.orderNumber}

${emailInfo.userFirstName} ${emailInfo.userLastName}, la tua eSIM è pronta

${emailInfo.regionName}
Dati: ${emailInfo.data}
Durata: ${emailInfo.duration === '1' ? emailInfo.duration + ' Giorno' : emailInfo.duration + ' Giorni'}

1. Installa la tua eSIM

Presta molta attenzione alle seguenti informazioni.

Puoi installarla prima o durante il tuo viaggio utilizzando il codice QR qui sotto o inserendo i codici manuali forniti in questa email.

- Vai su Impostazioni sul tuo dispositivo.
- Scansiona il codice QR o copia e incolla i codici manuali.
- Configura la tua eSIM.

Ti consigliamo di collegarti a una rete Wi-Fi stabile per garantire un processo di installazione fluido e senza problemi.

Scopri le istruzioni passo-passo sul nostro sito web.

[Vai all'installazione eSIM]

2. Attiva la tua eSIM

Una volta completata l'installazione, sarai pronto per attivare la tua eSIM. Si prega di notare che questo passaggio potrebbe richiedere fino a 4 minuti e dovrebbe essere eseguito solo una volta arrivato a destinazione.

- Vai su Impostazioni sul tuo dispositivo.
- Seleziona la tua eSIM ViajareSIM.
- Attiva il roaming dati.

Ti consigliamo di collegarti a una rete Wi-Fi stabile per garantire un processo di attivazione fluido e senza problemi.

Installa la tua eSIM con un codice QR

Scansiona il codice QR dalle Impostazioni sul tuo dispositivo mobile. Tieni presente che puoi installarlo prima o durante il viaggio.

Oppure installa manualmente

Trova il codice per il tuo sistema operativo qui sotto. Ricorda che i passaggi dettagliati sono disponibili sul sito web o nelle guide PDF.

Per Apple

Indirizzo SM-DP+: ${emailInfo.smdpAddress}
Codice di Attivazione: ${emailInfo.activationCodeIos}
Codice di Conferma: Non richiesto

Per Android

Codice di Attivazione: ${emailInfo.activationCodeAndroid}

Hai bisogno di aiuto con un problema?

Non esitare a contattarci per qualsiasi domanda.
Usa questo numero quando contatti il supporto per aiutarti a identificare questa eSIM: ${emailInfo.iccid}

[Vai al centro assistenza]

ViajareSIM`;
}
