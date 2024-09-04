import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { StyledRoot } from "./StyledRoot";
import { ShoppingProvider } from "./components/ShoppingContext/ShoppingContext";

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
        <link rel='icon' href='/img/favicon.ico' sizes='any'/>
      </head>
      <body>
        <ShoppingProvider>
          <AppRouterCacheProvider>
            <StyledRoot>{children}</StyledRoot>
          </AppRouterCacheProvider>
        </ShoppingProvider>
      </body>
    </html>
  );
}
