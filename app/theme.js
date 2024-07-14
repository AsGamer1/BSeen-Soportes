"use client";

import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

const PoppinsFont = Poppins({ subsets: ["latin"], weight: ["400","500","600","700"] })

export const bseenTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#039dde',
    },
    secondary: {
      main: '#733b89',
    },
  },
  typography: {
    fontFamily: PoppinsFont.style.fontFamily,
  }
});