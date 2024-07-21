"use client";

import { Alert, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LugarSchema } from "@/schemas";
import { crearLugar } from "@/actions/crear-lugar";
import { useState, useTransition } from "react";
import { Check, Close } from "@mui/icons-material";

export default function FormLugar() {

  const [errorResponse, setErrorResponse] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const [isPending, startTransition] = useTransition();

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(LugarSchema),
    defaultValues: {
      nombre: "",
      lat: "",
      lon: ""
    }
  });

  const OnSubmit = (values) => {
    startTransition(() => {
      crearLugar(values)
        .then((res) => {
          setErrorResponse(res.error);
          setSuccessResponse(res.success);
        })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)} noValidate style={{ flex: "1 1 0%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ padding: 3, minWidth: {sm: "320px"}}} elevation={5}>
          <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}>
            <Typography variant="h5">Añadir Lugar</Typography>
            <TextField {...register("nombre")} label="Nombre" error={!!errors.nombre} helperText={errors.nombre?.message} disabled={isPending} fullWidth required />
            <TextField {...register("lat", { valueAsNumber: true })} label="Latitud" error={!!errors.lat} helperText={errors.lat?.message} disabled={isPending} fullWidth required />
            <TextField {...register("lon", { valueAsNumber: true })} label="Longitud" error={!!errors.lon} helperText={errors.lon?.message} disabled={isPending} fullWidth required />
            <Button type="submit" variant="contained" disabled={isPending} fullWidth>Enviar</Button>
          </Stack>
        </Paper>
      </form>
      <Snackbar open={!!successResponse} autoHideDuration={4000} onClose={() => setSuccessResponse("")}>
        <Alert icon={<Check />} severity="success" variant="filled">{successResponse}</Alert>
      </Snackbar>
      <Snackbar open={!!errorResponse} autoHideDuration={4000} onClose={() => setErrorResponse("")}>
        <Alert icon={<Close />} severity="error" variant="filled">{errorResponse}</Alert>
      </Snackbar>
    </>
  );
}