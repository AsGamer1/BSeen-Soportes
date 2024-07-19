"use server";

import { RegisterSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByName } from "@/data/usuario";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function registerUser(values) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Campos inválidos" }

  const { nombre, password } = validatedFields.data

  const existingUser = await getUserByName(nombre)
  if (existingUser) return { error: "Ya existe este usuario" }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.usuario.create({ data: { nombre: nombre, password: hashedPassword } })

  try {
    await signIn("credentials", { nombre: nombre, password: password, redirectTo: DEFAULT_LOGIN_REDIRECT })
    return { success: "Usuario registrado, iniciando sesión..." }
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