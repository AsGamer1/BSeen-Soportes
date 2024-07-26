"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Points from "@/app/_components/points";
import Bounds from "@/app/_components/bounds";
import { useEffect, useState } from "react";
import { getAllLugares } from "@/actions/get-lugares";

export default function Map({ setIsOpen, setSelectedLugar, setSelectedSoportes, setColor }) {
  const balearicCenter = [39.616666666667, 2.8333333333333]
  const balearicBounds = [[38.50433614907999, 1.0721927485111802], [40.332479659371735, 4.48429792166977]]

  const [groups, setGroups] = useState([]);
  useEffect(() => {
    async function fetchLugares() {
      const lugaresData = await getAllLugares();
      const lugaresGroups = lugaresData.map((x) => x.grupo_id);
      setGroups([...new Set(lugaresGroups)]);
    }
    fetchLugares()
  }, []);

  return (
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
      <Bounds />
      {groups.map((group) => {
        return (
          <Points groupKey={group} setIsOpen={setIsOpen} setMarker={setSelectedLugar} setPoints={setSelectedSoportes} setColor={setColor} />
        )
      })}
    </MapContainer>
  )
}