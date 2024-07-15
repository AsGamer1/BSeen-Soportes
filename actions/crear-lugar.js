"use server";

import { LugarSchema } from "@/schemas";
import { db } from "@/lib/db";

export async function crearLugar(values) {
  const validatedFields = LugarSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { nombre, lat, lon } = validatedFields.data

  await db.lugar.create({ data: { nombre, lat, lon } })

  return { success: "Lugar creado" }
}