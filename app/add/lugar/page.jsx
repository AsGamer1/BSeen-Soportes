"use client";

import { Alert, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import Navbar from "@/app/_components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LugarSchema } from "@/schemas";
import { crearLugar } from "@/actions/crear-lugar";
import { useState } from "react";
import { Check, Close } from "@mui/icons-material";

export default function FormLugar() {

  const [errorResponse, setErrorResponse] = useState("");
  const [successResponse, setSuccessResponse] = useState("");

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(LugarSchema),
    defaultValues: {
      nombre: "",
      lat: "",
      lon: ""
    }
  });

  const OnSubmit = (values) => {
    crearLugar(values)
      .then((res) => {
        setErrorResponse(res.error);
        setSuccessResponse(res.success);
      })
  }

  return (
    <Stack height="100dvh">
      <Navbar title={"Test"} />
      <form onSubmit={handleSubmit(OnSubmit)} noValidate style={{ flex: "1 1 0%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ padding: 2, margin: 2 }} elevation={5}>
          <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 3 }}>
            <Typography variant="h4" fontWeight="600">Añadir Lugar</Typography>
            <TextField {...register("nombre")} label="Nombre" error={!!errors.nombre} helperText={errors.nombre?.message} />
            <TextField {...register("lat", { valueAsNumber: true })} label="Latitud" error={!!errors.lat} helperText={errors.lat?.message} />
            <TextField {...register("lon", { valueAsNumber: true })} label="Longitud" error={!!errors.lon} helperText={errors.lon?.message} />
            <Button type="submit" variant="contained">Enviar</Button>
          </Stack>
        </Paper>
      </form>
      <Snackbar open={!!successResponse} autoHideDuration={4000} onClose={()=>setSuccessResponse("")}>
        <Alert icon={<Check />} severity="success" variant="outlined">{successResponse}</Alert>
      </Snackbar>
      <Snackbar open={!!errorResponse} autoHideDuration={4000} onClose={()=>setErrorResponse("")}>
        <Alert icon={<Close />} severity="error" variant="outlined">{errorResponse}</Alert>
      </Snackbar>
    </Stack >
  );
}