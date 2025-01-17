import { Router } from "express"
import { createCourseHandler, listCoursesHandler } from "../controllers/courses"
import { validateRequestBody } from "../middleware/validation"
import { createCourseSchema } from "../schemas/courses"

export const coursesRoutes = Router()

coursesRoutes.get('/', listCoursesHandler)

coursesRoutes.post('/', validateRequestBody(createCourseSchema), createCourseHandler)
