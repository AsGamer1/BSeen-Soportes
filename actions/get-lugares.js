"use server";

import { db } from "@/lib/db";

async function getColorFromLugar(lugar) {
  const grupo = await db.grupo.findUnique({ where: { id: lugar.grupoId } })
  const color = await db.color.findUnique({ where: { id: grupo.colorId } })
  return { ...lugar, color: color.hex }
}

async function getSoportesFromLugar(lugar) {
  const items = await db.item.findMany({ where: { lugarId: lugar.id } })
  return { ...lugar, soportes: items }
}

export async function getAllLugares() {
  try {
    const lugares = await db.lugar.findMany()
    const lugaresColores = await Promise.all(lugares.map(async (lugar) => await getColorFromLugar(lugar)))
    const lugaresColoresSoportes = await Promise.all(lugaresColores.map(async (lugar) => await getSoportesFromLugar(lugar)))
    return lugaresColoresSoportes
  } catch (error) {
    return null
  }
}