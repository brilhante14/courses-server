import { z } from 'zod'

export const enrollUserSchema = z.object({
    userId: z.string().uuid().nonempty(),
    courseId: z.string().uuid().nonempty(),
})

export const listUserEnrollmentsSchema = z.object({
    userId: z.string().uuid().nonempty(),
})
