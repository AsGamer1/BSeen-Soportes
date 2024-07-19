"use client";

import { Box, Grid, Stack, SvgIcon, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import Navbar from "@/app/_components/navbar";
import Points from "@/app/_components/points";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";

export default function Dashboard() {

  const balearicCenter = [39.616666666667, 2.8333333333333]
  const balearicBounds = [[38.50433614907999, 1.0721927485111802], [40.332479659371735, 4.48429792166977]]

  const [selectedLugar, setSelectedLugar] = useState([]);

  const handleMarkerClick = (point) => {
    setSelectedLugar(point);
    console.log("Selected point:", point);
  };

  return (
    <>
      <Grid container sx={{ padding: 2 }} flexGrow={1} flexShrink={1}>
        <Grid item xs={12} md={6}>
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
            <Points onMarkerClick={handleMarkerClick} />
          </MapContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height="50%" sx={{overflow: selectedLugar.length < 1 ? "hidden" : "scroll", scrollbarWidth: "thin"}}>
            {selectedLugar &&
              <Table>
                <TableBody>
                  {selectedLugar.map(soporte =>
                    <TableRow>
                      <TableCell><SvgIcon>{soporte.svg}</SvgIcon></TableCell>
                      <TableCell>{soporte.nombre}</TableCell>
                      <TableCell>{soporte.soportedigital_id || soporte.soporteconvencional_id}</TableCell>
                      <TableCell>{soporte.lugarId}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            }
          </Box>
          <Box bgcolor="blue" height="50%"></Box>
        </Grid>
      </Grid>
    </>
  );
}