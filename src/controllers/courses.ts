import type { Request, Response } from "express-serve-static-core"
import type { z } from "zod"
import { CoursesRepository } from "../db/repositories/courses"
import type { createCourseSchema } from "../schemas/courses"


export async function createCourseHandler(req: Request<{}, {}, z.infer<typeof createCourseSchema>>, res: Response) {
    const { description, hours, title } = req.body

    const course = await new CoursesRepository().create({ description, hours, title })

    res.status(201).send(course)
}

export async function listCoursesHandler(_: Request, res: Response) {
    const courses = await new CoursesRepository().list()

    res.status(200).send(courses)
}