"use server";

import { db } from "@/lib/db";

async function getSVGFromSoporte(item) {
  const tipo =
    item.soportedigital_id ?
      (await db.soportedigital.findUnique({ where: { id: item.soportedigital_id } })).tipo_id :
      (await db.soporteconvencional.findUnique({ where: { id: item.soporteconvencional_id } })).tipo_id

  const tipoSVG = (await db.tipo.findUnique({ where: { id: tipo } })).svg
  return { ...item, svg: tipoSVG }
}

export async function getSoportesFromLugar(lugar_id) {
  const items = await db.item.findMany({ where: { lugarId: lugar_id } })
  const itemsSVG = await Promise.all(items.map(async (item) => await getSVGFromSoporte(item)))
  return itemsSVG
}