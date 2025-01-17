import type { Request, Response } from "express-serve-static-core"
import type { z } from "zod"
import { UsersRepository } from "../db/repositories/users"
import type { createUserSchema } from "../schemas/users"
import NotFoundError from "../exceptions/NotFoundError"
import { DateTime } from "luxon"

export async function createUserHandler(req: Request<{}, {}, z.infer<typeof createUserSchema>>, res: Response) {
    const { email, name, password } = req.body

    const hashedPassword = await Bun.password.hash(password, {
        algorithm: 'argon2id',
        timeCost: 3,
        memoryCost: 4
    })

    const user = await new UsersRepository().create({ email, name, password: hashedPassword })

    res.status(201).send(user)
}

export async function getUserHandler(req: Request<{ id: string }, {}>, res: Response) {
    const { id } = req.params

    const user = await new UsersRepository().get({ id })

    if (!user) throw new NotFoundError({ message: 'User not found' })

    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone

    res.status(200).send({
        ...user,
        password: undefined,
        enrolledAt: DateTime.fromJSDate(user.createdAt, { zone }).toISO()
    })
}