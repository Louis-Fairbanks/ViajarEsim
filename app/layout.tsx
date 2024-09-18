import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { StyledRoot } from "./StyledRoot";
import { ShoppingProvider } from "./components/ShoppingContext/ShoppingContext";
import SessionProvider from './components/SessionProvider/SessionProvider';
import Script from "next/script";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "ViajareSIM | eSIM internacional",
  description: "ViajareSIM ofrece eSIMs internacionales con internet ilimitado en más de 180 destinos, para que los viajeros siempre estén conectados.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(); 

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
        <Script id='fb-pixel'
          strategy='afterInteractive'>
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '387339964231038');`}
        </Script>
        <Script id='twitter-pixel'
          strategy="afterInteractive">
          {`
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','onqav');
`}
        </Script>
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTBPPDM7"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <noscript><img height="1" width="1" style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=387339964231038&ev=PageView&noscript=1"
        /></noscript>
        <SessionProvider session={session}>
        <ShoppingProvider>
          <AppRouterCacheProvider>
            <StyledRoot>{children}</StyledRoot>
          </AppRouterCacheProvider>
        </ShoppingProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
