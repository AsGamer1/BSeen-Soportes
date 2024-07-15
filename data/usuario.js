import { db } from "@/lib/db"

export async function getUserByName(nombre) {
  try {
    const user = await db.usuario.findUnique({ where: { nombre } })
    return user
  } catch {
    return null
  }
}

export async function getUserById(id) {
  try {
    const user = await db.usuario.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}