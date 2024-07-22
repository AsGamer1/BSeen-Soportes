"use server";

import { db } from "@/lib/db";

async function getColorFromLugar(lugar) {
  const grupo = await db.grupo.findUnique({ where: { id: lugar.grupoId } })
  const color = await db.color.findUnique({ where: { id: grupo.colorId } })
  return { ...lugar, color: color.hex }
}

export async function getAllLugares() {
  try {
    const lugares = await db.lugar.findMany()
    const lugaresColores = await Promise.all(lugares.map(async (lugar) => await getColorFromLugar(lugar)))
    return lugaresColores
  } catch (error) {
    return null
  }
}