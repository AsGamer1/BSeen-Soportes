import { BookmarkAdd, LocationOn } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";

export default function Navbar({ title }) {
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
      </Toolbar>
    </AppBar>
  )
}