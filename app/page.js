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
        <Points setIsOpen={setIsOpen} setMarker={setSelectedLugar} setPoints={setSelectedSoportes} />
      </MapContainer>
      <Drawer anchor="right" open={isOpen} onClose={() => { setIsOpen(false); setSelectedLugar(""); setSelectedSoportes([]) }}>
        <Stack sx={{ width: { md: "350px" }, overflow: "hidden" }}>
          <Typography variant="h5" sx={{ padding: 3, bgcolor: "primary.main", minHeight: "2rem", textAlign: "center" }}>{selectedLugar}</Typography>
          {selectedSoportes?.map(soporte =>
            <>
              <Typography>{soporte.nombre}</Typography>
              <Typography>{soporte.lugarId}</Typography>
            </>
          )}
        </Stack>
      </Drawer>
    </Stack>
  );
}