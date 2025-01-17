import { eq } from "drizzle-orm"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"

import { DB } from "../client"
import type {
    CreateCourseRepository,
    GetCourseByIdRepository,
    ListCoursesRepository
} from "../interfaces/courses"
import { Course } from "../models/schema"

export class CoursesRepository implements CreateCourseRepository, ListCoursesRepository, GetCourseByIdRepository {
    constructor(private db: PostgresJsDatabase = DB) { }

    public async create({ description, hours, id, title }: CreateCourseRepository.Params) {
        const [result] = await this.db
            .insert(Course)
            .values({
                description, hours, id, title
            })
            .returning()

        if (!result)
            throw new Error('Failed to insert')

        return (result)
    }

    public async list() {
        const result = await this.db.select().from(Course)

        return result
    }

    public async getById({ id }: GetCourseByIdRepository.Params) {
        const [result] = await this.db.select().from(Course).where(eq(Course.id, id))

        if (!result) return undefined

        return result
    }
}