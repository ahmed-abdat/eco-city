import { z } from "zod"

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
})

export const AuthCredentialsValidatorRegister = z.object({
  Username : z.string().min(3, {
    message: 'Username must be at least 3 characters long.',
    }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
})

export type TAuthCredentialsValidatorRegister = z.infer<
  typeof AuthCredentialsValidatorRegister>

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>