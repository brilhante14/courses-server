import { eq } from "drizzle-orm"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"

import { DB } from "../client"
import type { CreateUserRepository, GetUserRepository } from "../interfaces/users"
import { User } from "../models/schema"

export class UsersRepository implements CreateUserRepository, GetUserRepository {
    constructor(private db: PostgresJsDatabase = DB) { }

    public async create({ email, name, password }: CreateUserRepository.Params) {
        const [result] = await this.db
            .insert(User)
            .values({
                email,
                name,
                password
            })
            .returning({
                id: User.id,
                name: User.name,
                email: User.email,
                createdAt: User.createdAt
            })

        return result
    }

    public async get({ id }: GetUserRepository.Params) {
        const [result] = await this.db
            .select()
            .from(User)
            .where(eq(User.id, id))

        if (!result) return undefined

        return result
    }
}