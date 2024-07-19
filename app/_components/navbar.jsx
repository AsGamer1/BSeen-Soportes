"use client";

import { BookmarkAdd, LocationOn } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import dynamic from "next/dynamic";
const AvatarLogin = dynamic(()=>import("@/app/_components/avatar-login"), { ssr: false })

export default function Navbar({ title, session }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1 }}>{title}</Typography>
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
        <Tooltip title="">
          <AvatarLogin session={session} />
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}