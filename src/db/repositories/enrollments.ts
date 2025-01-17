import { eq } from "drizzle-orm"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"

import type { EnrollUserRepository, ListUserEnrollmentsRepository } from "../interfaces/enrollments"
import { Course, Enrollment } from "../models/schema"
import { DB } from "../client"

export class EnrollmentsRepository implements EnrollUserRepository, ListUserEnrollmentsRepository {
    constructor(private db: PostgresJsDatabase = DB) { }

    public async enroll({ courseId, userId }: EnrollUserRepository.Params) {
        const [result] = await this.db
            .insert(Enrollment)
            .values({
                courseId,
                userId
            })
            .returning()

        return result
    }

    public async listByUser({ userId }: ListUserEnrollmentsRepository.Params): Promise<ListUserEnrollmentsRepository.Return> {
        const result = await this.db
            .select()
            .from(Enrollment)
            .innerJoin(Course, eq(Course.id, Enrollment.courseId))
            .where(eq(Enrollment.userId, userId))

        return result.map(r => ({
            id: r.course.id,
            title: r.course.title,
            hours: r.course.hours,
            description: r.course.description,
            createdAt: r.course.createdAt,
            enrolledAt: r.enrollment.enrolledAt,
        }))
    }
}