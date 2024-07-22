"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllLugares } from "@/actions/get-lugares";
import { Room } from '@mui/icons-material';
import { useMap } from "react-leaflet";
import { Marker } from '@adamscybot/react-leaflet-component-marker';
import useSupercluster from "use-supercluster";
import "leaflet/dist/leaflet.css";

export default function Points({ setIsOpen, setMarker, setPoints }) {
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
      properties: { cluster: false, pointId: point.id, color: point.color, nombre: point.nombre, soportes: point.soportes },
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
      const { cluster: isCluster, point_count, point_count_abbreviated, cluster_id, pointId, color, nombre, soportes } = cluster.properties

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
          icon={<Room sx={{ color: color }} fontSize="large" onClick={() => { console.log(soportes);setMarker(nombre); setPoints(soportes); setIsOpen(true); }} />}
        />
      );
    })
  )
}