"use client";

import { Alert, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import Navbar from "@/app/_components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { Check, Close } from "@mui/icons-material";

export default function FormLugar() {

  const [errorResponse, setErrorResponse] = useState("");
  const [successResponse, setSuccessResponse] = useState("");
  const [isPending, startTransition] = useTransition();

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nombre: "",
      password: ""
    }
  });

  const OnSubmit = (values) => {
    setErrorResponse("");
    setSuccessResponse("");

    startTransition(() => { 
      login(values)
        .then((res) => {
          setErrorResponse(res?.error);
          setSuccessResponse(res?.success);
        })
    })
  }

  return (
    <Stack height="100dvh">
      <Navbar title={"Test"} />
      <form onSubmit={handleSubmit(OnSubmit)} noValidate style={{ flex: "1 1 0%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ padding: 2, margin: 2 }} elevation={5}>
          <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 3 }}>
            <Typography variant="h4" fontWeight="600">Añadir Lugar</Typography>
            <TextField {...register("nombre")} label="Nombre" error={!!errors.nombre} helperText={errors.nombre?.message} disabled={isPending} />
            <TextField {...register("password")} label="Contraseña" error={!!errors.password} helperText={errors.password?.message} disabled={isPending} type="password" />
            <Button type="submit" variant="contained" disabled={isPending}>Enviar</Button>
          </Stack>
        </Paper>
      </form>
      <Snackbar open={!!successResponse} autoHideDuration={4000} onClose={() => setSuccessResponse("")}>
        <Alert icon={<Check />} severity="success" variant="filled">{successResponse}</Alert>
      </Snackbar>
      <Snackbar open={!!errorResponse} autoHideDuration={4000} onClose={() => setErrorResponse("")}>
        <Alert icon={<Close />} severity="error" variant="filled">{errorResponse}</Alert>
      </Snackbar>
    </Stack >
  );
}