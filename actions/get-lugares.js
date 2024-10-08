"use server";

import { db } from "@/lib/db";

async function getColorFromLugar(lugar) {
  const grupo = await db.grupo.findUnique({ where: { id: lugar.grupo_id } })
  return { ...lugar, grupo: grupo.nombre, color: grupo.colorhex }
}

async function getSoportesFromLugar(lugar) {
  const soportes = await db.soporte.findMany({ where: { lugar_id: lugar.id } })
  const soportesTipo = await Promise.all(soportes.map(async (soporte) => await getTipoFromSoporte(soporte)))
  return { ...lugar, soportes: soportesTipo }
}

async function getTipoFromSoporte(soporte) {
  const tipo = await db.tipo.findUnique({ where: { id: soporte.tipo_id } })
  return { ...soporte, tipo: tipo }
}

async function getEspaciosFromSoporte(soporte) {
  const espacio = await db.espacio.findMany({ where: { soporteId: soporte.id } })
  return { ...soporte, espacio: espacio }
}

export async function getAllLugares(groupKey) {
  try {
    const lugares =
      groupKey ?
        await db.lugar.findMany({ where: { grupo_id: groupKey } }) :
        await db.lugar.findMany();
    const lugaresGrupos = await Promise.all(lugares.map(async (lugar) => await getColorFromLugar(lugar)))
    const lugaresGruposSoportes = await Promise.all(lugaresGrupos.map(async (lugar) => await getSoportesFromLugar(lugar)))
    // not working --> const lugaresFull = await Promise.all(lugaresGruposSoportes.map(async (soporte) => await getEspaciosFromSoporte(soporte)))
    return lugaresGruposSoportes
  } catch (error) {
    return null
  }
}