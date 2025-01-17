import type { RequestHandler } from 'express'
import { type AnyZodObject, z } from 'zod'
import BadRequestError from '../exceptions/BadRequestError'

const validate = <T extends AnyZodObject>(
    schema: T,
    source: 'body' | 'params' | 'query'
): RequestHandler => {
    return async (req, _, next) => {
        try {
            await schema.parseAsync(req[source])
            next()
        } catch (err) {
            if (err instanceof z.ZodError) {
                throw new BadRequestError({
                    message: `Invalid ${source} schema`,
                    context: err.errors,
                })
            } else {
                next(err)
            }
        }
    }
}

const validateRequestBody = (schema: AnyZodObject): RequestHandler => {
    return validate(schema, 'body')
}

const validateRequestParams = (schema: AnyZodObject): RequestHandler => {
    return validate(schema, 'params')
}

const validateRequestQuery = (schema: AnyZodObject): RequestHandler => {
    return validate(schema, 'query')
}

export { validateRequestBody, validateRequestParams, validateRequestQuery }
