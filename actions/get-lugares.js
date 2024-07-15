"use server";

import { db } from "@/lib/db";

export async function getAllLugares() {
  try {
    const lugares = await db.lugar.findMany()
    return lugares
  } catch (error) {
    return null
  }
}