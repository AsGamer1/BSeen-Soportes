"use client";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

function MyComponent() {
  const map = useMap();
  const bounds = [[0, 0], [1, 1]]
  map.fitBounds(bounds)
  return null
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
      <MyComponent />
      <Marker position={balearicCenter} />
    </MapContainer>
  );
}