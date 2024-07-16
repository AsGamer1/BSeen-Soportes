"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllLugares } from "@/actions/get-lugares";
import { Room } from '@mui/icons-material';
import { MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { Marker } from '@adamscybot/react-leaflet-component-marker';
import useSupercluster from "use-supercluster";
import "leaflet/dist/leaflet.css";

function Points() {
  const map = useMap();

  const [lugares, setLugares] = useState([]);
  useEffect(() => {
    async function fetchLugares() {
      const lugaresData = await getAllLugares();
      map.fitBounds(lugaresData.map((point) => [point.lat, point.lon]))
      setLugares(lugaresData);
    }
    fetchLugares()
  }, []);

  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);

  function updateMap() {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  const points =
    lugares.length > 0 &&
    lugares.map(point => ({
      type: "Feature",
      properties: { cluster: false, pointId: point.id },
      geometry: {
        type: "Point",
        coordinates: [
          point.lon,
          point.lat
        ]
      }
    }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
  });

  return (
    clusters.map(cluster => {
      const [longitude, latitude] = cluster.geometry.coordinates;

      const { cluster: isCluster, point_count, point_count_abbreviated } = cluster.properties

      if (isCluster) {
        return (
          <Marker
            key={`cluster-${cluster.id}`}
            position={[latitude, longitude]}
            icon={<div className={`marker-cluster marker-cluster-${point_count < 5 ? "small" : point_count < 10 ? "medium" : "large"}`}><div><span>{point_count_abbreviated}</span></div></div>}
          />
        );
      }

      return (
        <Marker
          key={`point-${cluster.properties.pointId}`}
          position={[latitude, longitude]}
          icon={<Room color="primary" fontSize="large" />}
        />
      );
    })
  )

}

export default function Map() {
  const balearicCenter = [39.616666666667, 2.8333333333333]
  const balearicBounds = [[38.50433614907999, 1.0721927485111802], [40.332479659371735, 4.48429792166977]]

  return (
    <MapContainer
      center={balearicCenter}
      bounds={balearicBounds}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      trackResize
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
      />
      <Points />
    </MapContainer>
  )
}

