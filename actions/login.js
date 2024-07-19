"use server";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function login(values) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Campos inválidos" }

  const { nombre, password } = validatedFields.data

  try {
    await signIn("credentials", { nombre: nombre, password: password, redirectTo: DEFAULT_LOGIN_REDIRECT })
    return { success: "Iniciando sesión..." }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Datos incorrectos" }
        default:
          return { error: "Datos incorrectos" }
      }
    }
    throw error
  }
}