import { BookmarkAdd, LocationOn } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";

export default function Navbar({ title }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1 }}>{title}</Typography>
        <Tooltip title="Mapa">
          <IconButton color="inherit">
            <LocationOn />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reservar">
          <IconButton color="inherit">
            <BookmarkAdd />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}