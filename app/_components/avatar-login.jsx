"use client";

import { logout } from "@/actions/logout";
import { Logout, Person } from "@mui/icons-material";
import { Avatar, Backdrop, Button, Card, CardActions, CardContent, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function AvatarLogin({session}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const anchorEl = useRef();

  const NavButton = styled(Button)({
    textTransform: "none",
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
  })

  const UserAvatar = styled(Avatar)({
    backgroundColor: "secondary.main",
  })

  if (session?.user) {
    return (
      <>
        <Button ref={anchorEl} onClick={() => setIsMenuOpen(true)} style={{ borderRadius: 8, minWidth: 0, padding: 8 }}>
          <UserAvatar>{session?.user?.name.split(" ").map(function (item, index) { if (index < 2) return item[0] }).join('')}</UserAvatar>
        </Button>
        <Menu anchorEl={anchorEl.current} open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <MenuItem onClick={() => { setIsMenuOpen(false); setIsDialogOpen(true) }}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Cerrar sesión</ListItemText>
          </MenuItem>
        </Menu>
        <Backdrop open={isDialogOpen}>
          <Card sx={{ bgcolor: "white", padding: 1, maxWidth: "500px" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="600" color="black" marginBottom="8px" fontSize="18px">¿Quieres cerrar sesión?</Typography>
              <Typography variant="body2" fontWeight="600" color="#71717A">Esto hará que tengas que iniciar sesión de nuevo para poder ver tus marcas y estadísticas.</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <NavButton onClick={() => setIsDialogOpen(false)} variant="contained" sx={{ bgcolor: "white", "&:hover": { bgcolor: "#dfdfdf" } }}>Cancelar</NavButton>
              <NavButton onClick={() => { logout(); setIsDialogOpen(false) }} variant="contained">Cerrar sesión</NavButton>
            </CardActions>
          </Card>
        </Backdrop>
      </>
    )
  } else {
    return (
      <IconButton color="inherit" href="/auth/login">
        <Person />
      </IconButton>
    )
  }
}