"use client";

import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/app/_components/map'), { ssr: false })

export default function Dashboard() {

  const [selectedLugar, setSelectedLugar] = useState("");
  const [selectedSoportes, setSelectedSoportes] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("");

  const DrawerClose = () => {
    setIsOpen(false);
    setSelectedLugar("");
    setSelectedSoportes([]);
  }

  return (
    <Stack sx={{ padding: 2, flexGrow: 1, flexShrink: 1, width: "80%", alignSelf: "center" }}>
      <Map setSelectedLugar={setSelectedLugar} setIsOpen={setIsOpen} setSelectedSoportes={setSelectedSoportes} setColor={setColor} />
      <Drawer anchor="right" open={isOpen} onClose={DrawerClose}>
        <Stack sx={{ width: "calc(min(320px, 70vw))", overflow: "hidden" }}>
          <Box sx={{ padding: 3, color: "white", bgcolor: color, minHeight: "2rem", textAlign: "center" }}>
            {selectedLugar.split("/n").map(lugar =>
              <>
                <Typography variant="h6">{lugar}</Typography>
              </>
            )}
          </Box>
          {selectedSoportes?.map(soporte =>
            <>
              <Typography>{soporte.nombre}</Typography>
              <Typography>{soporte.tipo.nombre}</Typography>
            </>
          )}
        </Stack>
      </Drawer>
    </Stack>
  );
}