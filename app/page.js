"use client";

import { Drawer, Stack, Typography } from "@mui/material";
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
          <Typography variant="h6" sx={{ padding: 3, color: "white", bgcolor: color, minHeight: "2rem", textAlign: "center" }}>{selectedLugar}</Typography>
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