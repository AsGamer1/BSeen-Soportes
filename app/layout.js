import "@/app/globals.css"

import { bseenTheme } from "@/app/theme";
import Head from "@/app/head";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";

export default async function RootLayout({ children }) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="es">
        <Head />
        <body>
          <ThemeProvider theme={bseenTheme}>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
