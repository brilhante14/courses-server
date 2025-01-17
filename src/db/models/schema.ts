import { pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core"

const createdAt = timestamp('created_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull()

export const User = pgTable('user', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt,
})

export const Course = pgTable('course', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    hours: text('hours').notNull(),
    createdAt,
})

export const Enrollment = pgTable('enrollment', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => User.id).notNull(),
    courseId: uuid('course_id').references(() => Course.id).notNull(),
    enrolledAt: timestamp('enrolled_at', {
        withTimezone: true,
        mode: 'date'
    })
        .defaultNow()
        .notNull(),

}, (table) => [{
    uniqueCourseUser: unique('unique_course_user').on(
        table.userId,
        table.courseId,
    ),
}],)

