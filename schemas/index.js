import * as z from "zod"

export const LoginSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  password: z.string({ message: "" }).min(1, { message: "" })
})

export const RegisterSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  rol: z.enum(["USER", "ADMIN"]),
  password: z.string({ message: "" }).min(6, { message: "" })
})