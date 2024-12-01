"use client";
import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  //get the font that you use for the styles
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  //create the theme for the mui icons
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export function StyledRoot({
  //export the theme provider
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
