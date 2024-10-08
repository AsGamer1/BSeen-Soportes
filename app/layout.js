import "@/app/globals.css"

import { bseenTheme } from "@/app/theme";
import Head from "@/app/head";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Stack, ThemeProvider } from "@mui/material";

export default async function RootLayout({ children }) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="es">
        <Head />
        <body>
          <ThemeProvider theme={bseenTheme}>
            <Stack sx={{ height: "100dvh" }}>
              {children}
            </Stack>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
