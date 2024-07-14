"use client";

import { Box, Grid, Stack } from "@mui/material";
import Navbar from "./_components/navbar";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/app/_components/map"), { ssr: false })

export default function Dashboard() {

  return (
    <Stack height="100dvh">
      <Navbar title={"Dashboard"} />
      <Grid container sx={{ padding: 2 }} flexGrow={1} flexShrink={1}>
        <Grid item xs={12} md={6}>
          <Map />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box bgcolor="red" height="50%"></Box>
          <Box bgcolor="blue" height="50%"></Box>
        </Grid>
      </Grid>
    </Stack>
  );
}