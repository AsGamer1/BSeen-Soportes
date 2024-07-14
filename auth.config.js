import Credentials from "next-auth/providers/credentials"
import { getUserByName } from "@/data/user";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { nombre, password } = validatedFields.data
          const usuario = await getUserByName(nombre)
          if (!usuario) return null
          const passwordsMatch = await bcrypt.compare(password, usuario.password)
          if (passwordsMatch) return usuario
        }
        return null
      }
    })
  ],
}