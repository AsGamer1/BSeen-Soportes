"use server";

import { db } from "@/lib/db";

async function getSoporteDigitalOrConvencional(item) {
  const tipo =
    item.soportedigital_id ?
      (await db.soportedigital.findUnique({ where: { id: item.soportedigital_id } })).tipo_id :
      (await db.soporteconvencional.findUnique({ where: { id: item.soporteconvencional_id } })).tipo_id

  const soporte = (await db.tipo.findUnique({ where: { id: tipo } })).nombre
  return { ...item, soporte: soporte }
}

export async function getSoportesFromLugar(lugar_id) {
  const items = await db.item.findMany({ where: { lugarId: lugar_id } })
  const itemsSoporte = await Promise.all(items.map(async (item) => await getSoporteDigitalOrConvencional(item)))
  return itemsSoporte
}