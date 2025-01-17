import type { Request, Response } from "express-serve-static-core"
import type { z } from "zod"
import { EnrollmentsRepository } from "../db/repositories/enrollments"
import type { enrollUserSchema } from "../schemas/enrollments"
import { UsersRepository } from "../db/repositories/users"
import { CoursesRepository } from "../db/repositories/courses"
import NotFoundError from "../exceptions/NotFoundError"
import { DateTime } from "luxon"


export async function enrollUserHandler(req: Request<{}, {}, z.infer<typeof enrollUserSchema>>, res: Response) {
    const { courseId, userId } = req.body

    const [user, course] = await Promise.all([
        new UsersRepository().get({ id: userId }),
        new CoursesRepository().getById({ id: courseId })
    ])

    if (!user) throw new NotFoundError({ message: `User with id ${userId} was not found` })
    if (!course) throw new NotFoundError({ message: `Course with id ${courseId} was not found` })

    const enrollment = await new EnrollmentsRepository().enroll({ courseId, userId })

    res.status(200).send(enrollment)
}

export async function listEnrollmentsByUserHandler(req: Request<{ userId: string }, {}>, res: Response) {
    const { userId } = req.params

    const user = await new UsersRepository().get({ id: userId })
    if (!user) throw new NotFoundError({ message: `User with id ${userId} was not found` })

    const enrollments = await new EnrollmentsRepository().listByUser({ userId })

    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone

    res.status(200).send(enrollments.map(enrollment => ({
        ...enrollment,
        enrolledAt: DateTime.fromJSDate(enrollment.enrolledAt, { zone }).toISO()
    })))
}