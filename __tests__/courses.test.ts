import { afterEach, describe, expect, it, mock } from "bun:test"
import { CoursesRepository } from "../src/db/repositories/courses"
import { fromMock, returningMock, whereMock } from "./mocks/drizzle-orm"

const coursesRepo = new CoursesRepository()

describe("courses", () => {
    afterEach(() => {
        mock.restore()
    })

    it("should create a course", async () => {
        const newCourse = {
            id: "101",
            title: "Math 101",
            description: "Math class",
            hours: '[8-10]'
        }
        const createdAt = new Date()

        returningMock.mockResolvedValue([{ ...newCourse, createdAt }])

        const createdCourse = await coursesRepo.create(newCourse)

        expect(createdCourse).toEqual({ ...newCourse, createdAt })
    })

    it("should list all courses", async () => {
        const course1 = {
            id: "101",
            title: "Math 101",
            description: "Math class",
            hours: '[8-10]'
        }
        const course2 = {
            id: "102",
            title: "History 101",
            description: "History class",
            hours: '[14-16]'
        }

        const createdAt = new Date()
        const course1WithCreatedAt = { ...course1, createdAt }
        const course2WithCreatedAt = { ...course2, createdAt }

        fromMock.mockImplementation(() => ({ where: whereMock }))
        fromMock.mockResolvedValue([course1WithCreatedAt, course2WithCreatedAt])

        const allCourses = await coursesRepo.list()
        expect(allCourses).toEqual([course1WithCreatedAt, course2WithCreatedAt])
    })
})

