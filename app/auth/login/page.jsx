"use client";

import { Alert, Avatar, Box, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import Navbar from "@/app/_components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { Check, Close, LockOutlined } from "@mui/icons-material";

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
    <>
      <form onSubmit={handleSubmit(OnSubmit)} noValidate style={{ flex: "1 1 0%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ padding: 3, minWidth: { sm: "320px" } }} elevation={5}>
          <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 2 }}>
            <Stack sx={{ justifyContent: "center", alignItems: "center", gap: 1 }}>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <LockOutlined />
              </Avatar>
              <Typography variant="h5">Iniciar sesión</Typography>
            </Stack>
            <TextField {...register("nombre")} label="Nombre" error={!!errors.nombre} helperText={errors.nombre?.message} disabled={isPending} fullWidth required />
            <TextField {...register("password")} label="Contraseña" error={!!errors.password} helperText={errors.password?.message} disabled={isPending} type="password" fullWidth required />
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