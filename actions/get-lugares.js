"use server";

import { db } from "@/lib/db";

async function getColorFromLugar(lugar) {
  const grupo = await db.grupo.findUnique({ where: { id: lugar.grupo_id } })
  return { ...lugar, grupo: grupo.nombre, color: grupo.colorhex }
}

async function getSoportesFromLugar(lugar) {
  const soportes = await db.soporte.findMany({ where: { lugar_id: lugar.id } })
  return { ...lugar, soportes: soportes }
}

export async function getAllLugares(groupKey) {
  try {
    const lugares =
      groupKey ?
        await db.lugar.findMany({ where: { grupo_id: groupKey } }) :
        await db.lugar.findMany();
    const lugaresGrupos = await Promise.all(lugares.map(async (lugar) => await getColorFromLugar(lugar)))
    const lugaresGruposSoportes = await Promise.all(lugaresGrupos.map(async (lugar) => await getSoportesFromLugar(lugar)))
    return lugaresGruposSoportes
  } catch (error) {
    return null
  }
}