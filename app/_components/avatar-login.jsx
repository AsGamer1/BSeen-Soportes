"use client";

import { logout } from "@/actions/logout";
import { AccountCircle, Logout, Person } from "@mui/icons-material";
import { Backdrop, Button, Card, CardActions, CardContent, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, Tooltip, Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function AvatarLogin({ session }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const anchorEl = useRef();

  const NavButton = styled(Button)({
    textTransform: "none",
    borderRadius: 8,
    paddingTop: 8,
    paddingBottom: 8,
  })

  if (session?.user) {
    return (
      <>
        <Tooltip title="Perfil">
          <IconButton ref={anchorEl} onClick={() => setIsMenuOpen(true)}>
            <AccountCircle sx={{ fill: "white" }} />
          </IconButton>
        </Tooltip>
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
              <Typography variant="body2" fontWeight="600" color="#71717A">Esto hará que tengas que iniciar sesión de nuevo para poder acceder a esta aplicación</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <NavButton onClick={() => setIsDialogOpen(false)} variant="outlined" color="inherit">Cancelar</NavButton>
              <NavButton onClick={() => { logout(); setIsDialogOpen(false) }} variant="contained" color="error">Cerrar sesión</NavButton>
            </CardActions>
          </Card>
        </Backdrop>
      </>
    )
  } else {
    return (
      <Tooltip title="Iniciar sesión">
        <IconButton color="inherit" href="/auth/login">
          <Person />
        </IconButton>
      </Tooltip>
    )
  }
}