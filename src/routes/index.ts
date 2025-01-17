import { Router } from "express"
import { coursesRoutes } from "./courses"
import { enrollmentsRoutes } from "./enrollments"
import { usersRoutes } from "./users"

export const routes = Router()

routes.use('/courses', coursesRoutes)
routes.use('/enrollments', enrollmentsRoutes)
routes.use('/users', usersRoutes)