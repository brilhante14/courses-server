import { z } from 'zod'

export const createCourseSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    hours: z.string().nonempty(),
})
