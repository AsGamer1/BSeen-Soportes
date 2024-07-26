import { getAllLugares } from "@/actions/get-lugares";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function Bounds() {
  const map = useMap();

  useEffect(() => {
    async function fetchLugares() {
      const lugaresData = await getAllLugares();
      map.fitBounds(lugaresData.map((point) => [point.lat, point.lon]), { padding: [30, 30] })
    }
    fetchLugares()
  }, []);

  return <></>

}