import { Router } from "express"
import { enrollUserHandler, listEnrollmentsByUserHandler } from "../controllers/enrollments"
import { validateRequestBody, validateRequestParams } from "../middleware/validation"
import { enrollUserSchema, listUserEnrollmentsSchema } from "../schemas/enrollments"

export const enrollmentsRoutes = Router()

enrollmentsRoutes.get('/:userId', validateRequestParams(listUserEnrollmentsSchema), listEnrollmentsByUserHandler)

enrollmentsRoutes.post('/', validateRequestBody(enrollUserSchema), enrollUserHandler)
