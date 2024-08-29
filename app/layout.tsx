import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { StyledRoot } from "./StyledRoot";
import { ShoppingProvider } from "./components/ShoppingContext/ShoppingContext";

export const metadata: Metadata = {
  title: "Viajar Esim",
  description: "Conectate con el mundo con tarjetas esim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
