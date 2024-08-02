"use client";

import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useState } from "react";
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/app/_components/map'), { ssr: false })

export default function Dashboard() {

  const [selectedLugar, setSelectedLugar] = useState({});
  const [selectedSoportes, setSelectedSoportes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const DrawerClose = () => {
    setIsOpen(false);
    setSelectedLugar({});
    setSelectedSoportes([]);
  }

  return (
    <Stack sx={{ padding: 2, flexGrow: 1, flexShrink: 1, width: "80%", alignSelf: "center" }}>
      <Map setSelectedLugar={setSelectedLugar} setIsOpen={setIsOpen} setSelectedSoportes={setSelectedSoportes} />
      <Drawer anchor="right" open={isOpen} onClose={DrawerClose}>
        <Stack sx={{ width: "calc(min(320px, 70vw))", height: "50%", overflow: "hidden" }}>
          <Box sx={{ bgcolor: selectedLugar?.color, padding: 3, color: "white", minHeight: "2rem", textAlign: "center" }}>
            {selectedLugar?.nombre?.split("/n").map(lugar =>
              <Typography key={lugar} variant="h6">{lugar}</Typography>
            )}
            <Typography variant="body2">{selectedLugar?.grupo}</Typography>
          </Box>
          <List>
            {selectedSoportes?.map(soporte =>
              <ListItem sx={{ justifyContent: "space-evenly" }}>
                <ListItemText sx={{ flex: "unset" }}>{soporte.cantidad}</ListItemText>
                <ListItemText sx={{ flex: "unset" }}>{soporte.tipo.nombre}</ListItemText>
              </ListItem>
            )}
          </List>
        </Stack>
        <Divider />
        <Stack sx={{ height: "50%" }}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemText>

                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Drawer>
    </Stack>
  );
}