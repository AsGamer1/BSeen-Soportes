"use client";

import { useEffect, useState } from "react";
import { getAllLugares } from "@/actions/get-lugares";
import { Room } from '@mui/icons-material';
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Marker } from '@adamscybot/react-leaflet-component-marker';
import "leaflet/dist/leaflet.css";

function Points() {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    async function fetchLugares() {
      const lugaresData = await getAllLugares();
      setLugares(lugaresData);
    }

    fetchLugares();
  }, []);

  return (
    lugares &&
    lugares.map((point) => (
      <Marker position={[point.lat, point.lon]} icon={<Room color="primary"/>}>
        <Popup>
          {point.nombre}
        </Popup>
      </Marker>
    ))
  );
}

export default function Map() {
  const balearicCenter = [39.616666666667, 2.8333333333333]
  const balearicBounds = [[38.50433614907999, 1.0721927485111802], [40.332479659371735, 4.48429792166977]]

  return (
    <MapContainer
      bounds={balearicBounds}
      maxBounds={balearicBounds}
      center={balearicCenter}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      trackResize
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
      >
        <Points />
      </MarkerClusterGroup>
    </MapContainer>
  );
}