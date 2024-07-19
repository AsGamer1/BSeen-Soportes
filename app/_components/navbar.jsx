"use client";

import { BookmarkAdd, LocationOn, Person } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const AvatarLogin = dynamic(() => import("@/app/_components/avatar-login"), {
  ssr: false,
  loading: () =>
    <IconButton color="inherit" href="/auth/login">
      <Person />
    </IconButton>
})

export default function Navbar({ session }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1 }}>Soportes</Typography>
        <Tooltip title="Mapa">
          <IconButton color="inherit" href="/">
            <LocationOn />
          </IconButton>
        </Tooltip>
        <Tooltip title="Lugares">
          <IconButton color="inherit" href="/add/lugar">
            <BookmarkAdd />
          </IconButton>
        </Tooltip>
        <AvatarLogin session={session} />
      </Toolbar>
    </AppBar>
  )
}