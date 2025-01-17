import { z } from 'zod'

export const createUserSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(6),
})

export const getUserSchema = z.object({
    id: z.string().uuid().nonempty(),
})
