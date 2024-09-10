import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { StyledRoot } from "./StyledRoot";
import { ShoppingProvider } from "./components/ShoppingContext/ShoppingContext";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ViajareSIM | eSIM",
  description: "Conectate con el mundo con tarjetas esim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel='icon' href='/img/favicon.png' sizes='64x64' />
        <Script
          src={"https://www.googletagmanager.com/gtag/js?id=G-DLT4ZJKTX8"}
          strategy='afterInteractive'
        />
        <Script
          id='google-analytics'
          strategy="afterInteractive">
          {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
           
             gtag('config', 'G-DLT4ZJKTX8');           
            `}
        </Script>
        <Script id='google-tag-manager'
          strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PTBPPDM7');`}
        </Script>
        <Script
          src={'https://www.googletagmanager.com/gtag/js?id=AW-16673712119'}
          strategy="afterInteractive"
        />
        <Script
          id='google-ads'
          strategy='afterInteractive'
        >
          {
            `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16673712119');`
          }
        </Script>
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTBPPDM7"
          height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe></noscript>
        <ShoppingProvider>
          <AppRouterCacheProvider>
            <StyledRoot>{children}</StyledRoot>
          </AppRouterCacheProvider>
        </ShoppingProvider>
      </body>
    </html>
  );
}
