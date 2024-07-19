import * as z from "zod"

export const LoginSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  password: z.string({ message: "" }).min(1, { message: "" })
})

export const RegisterSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  password: z.string({ message: "" }).min(6, { message: "" })
})

export const LugarSchema = z.object({
  nombre: z.string().min(1, "No puede dejarse en blanco"),
  lat: z.number({invalid_type_error: "Se necesita un número. Ejemplo: 39.666"}),
  lon: z.number({invalid_type_error: "Se necesita un número. Ejemplo: 2.999"})
})