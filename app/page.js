"use client";

import { Drawer, Stack, Typography } from "@mui/material";
import Points from "@/app/_components/points";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";

export default function Dashboard() {

  const balearicCenter = [39.616666666667, 2.8333333333333]
  const balearicBounds = [[38.50433614907999, 1.0721927485111802], [40.332479659371735, 4.48429792166977]]

  const [selectedLugar, setSelectedLugar] = useState("");
  const [selectedSoportes, setSelectedSoportes] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("primary.main")

  return (
    <Stack sx={{ padding: 2, flexGrow: 1, flexShrink: 1, width: "80%", alignSelf: "center" }}>
      <MapContainer
        center={balearicCenter}
        bounds={balearicBounds}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomSnap={0.1}
        trackResize
      >
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        <Points setIsOpen={setIsOpen} setMarker={setSelectedLugar} setPoints={setSelectedSoportes} setColor={setColor} />
      </MapContainer>
      <Drawer anchor="right" open={isOpen} onClose={() => { setIsOpen(false); setSelectedLugar(""); setSelectedSoportes([]) }}>
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