import { Router } from "express"
import { createUserHandler, getUserHandler } from "../controllers/users"
import { validateRequestBody, validateRequestParams } from "../middleware/validation"
import { createUserSchema, getUserSchema } from "../schemas/users"

export const usersRoutes = Router()

usersRoutes.get('/:id', validateRequestParams(getUserSchema), getUserHandler)

usersRoutes.post('/', validateRequestBody(createUserSchema), createUserHandler)
