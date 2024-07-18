"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllLugares } from "@/actions/get-lugares";
import { Room } from '@mui/icons-material';
import { LayerGroup, MapContainer, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { Marker } from '@adamscybot/react-leaflet-component-marker';
import useSupercluster from "use-supercluster";
import "leaflet/dist/leaflet.css";

function Points() {
  // Hook para utilizar el mapa actual
  const map = useMap();

  // Estado que almacenará los puntos del mapa desde la base de datos usando la acción de servidor getAllLugares()
  const [lugares, setLugares] = useState([]);
  useEffect(() => {
    async function fetchLugares() {
      const lugaresData = await getAllLugares();
      // Una vez obtenidos los lugares, se encuadra el mapa según los puntos que haya
      map.fitBounds(lugaresData.map((point) => [point.lat, point.lon]), { padding: [50, 50] })
      setLugares(lugaresData);
    }
    fetchLugares()
  }, []);

  // Supercluster
  // Estados que almacenan los bordes y el zoom del mapa
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);

  // Función para actualizar los estados con el estado del mapa actual
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

  // Callback para actualizar el mapa
  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  // Efecto que actualiza el mapa cada vez que cambie
  useEffect(() => {
    updateMap();
  }, [map]);

  // Efecto que llama al callback cada vez que el usuario se mueva por el mapa
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
      properties: { cluster: false, pointId: point.id, color: point.color },
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
    options: {
      radius: 0
    }
  });

  return (
    clusters.map(cluster => {
      const [longitude, latitude] = cluster.geometry.coordinates;
      const { cluster: isCluster, point_count, point_count_abbreviated, cluster_id, pointId, color } = cluster.properties

      if (isCluster) {
        return (
          <Marker
            key={`cluster-${cluster.id}`}
            position={[latitude, longitude]}
            icon={
              <div
                className={`marker-cluster marker-cluster-${point_count < 5 ? "small" : point_count < 10 ? "medium" : "large"}`}
                onClick={() => {
                  const expansionZoom = Math.ceil(supercluster.getClusterExpansionZoom(cluster_id)) + 1
                  map.flyTo([latitude, longitude], expansionZoom)
                }}
              >
                <div>
                  <span>{point_count_abbreviated}</span>
                </div>
              </div>
            }
          />
        );
      }

      return (
        <Marker
          key={`point-${pointId}`}
          position={[latitude, longitude]}
          icon={<Room sx={{color: color}} fontSize="large" onClick={()=>console.log(pointId)} />}
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
      zoomSnap={0.1}
      trackResize
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
      />
      <Points />
    </MapContainer>
  )
}