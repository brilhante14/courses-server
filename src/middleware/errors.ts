import type { Request, Response } from "express-serve-static-core"

export const errorHandler = (err: Error, _: Request, res: Response) => {
    if (err instanceof CustomError) {
        const { statusCode, errors, logging } = err
        if (logging) {
            console.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack,
            }, null, 2))
        }

        res.status(statusCode).send({ errors })
        return
    }

    console.error(JSON.stringify(err, null, 2))
    res.status(500).send({ errors: [{ message: "Something went wrong" }] })
}

export type CustomErrorContent = {
    message: string,
    context?: { [key: string]: any }
}

export abstract class CustomError extends Error {
    abstract readonly statusCode: number
    abstract readonly errors: CustomErrorContent[]
    abstract readonly logging: boolean

    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this, CustomError.prototype)
    }
}