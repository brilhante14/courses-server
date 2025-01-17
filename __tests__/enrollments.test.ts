import { afterEach, describe, expect, it, mock } from "bun:test"
import { EnrollmentsRepository } from "../src/db/repositories/enrollments"
import { fromMock, returningMock, whereMock } from "./mocks/drizzle-orm"

const enrollmentsRepo = new EnrollmentsRepository()

describe('enrollments', () => {
    afterEach(() => {
        mock.restore()
    })

    it("should enroll a user in a course", async () => {
        returningMock.mockResolvedValue([{
            id: '1',
            userId: '1',
            courseId: '101',
            enrolledAt: new Date()
        }])

        const newEnrollment = await enrollmentsRepo.enroll({ userId: "1", courseId: "101" })

        expect(newEnrollment).toEqual({
            id: '1',
            userId: '1',
            courseId: '101',
            enrolledAt: new Date()
        })
    })

    it("should list enrollments for a specific user", async () => {
        fromMock.mockImplementation(() => ({ innerJoin: () => ({ where: whereMock }) }))
        whereMock.mockResolvedValue([{
            course: {
                id: '101',
                title: 'Math',
                hours: '[8-12]',
                description: 'Math Classes',
                createdAt: new Date()
            },
            enrollment: {
                enrolledAt: new Date()
            }
        },
        {
            course: {
                id: '102',
                title: 'History',
                hours: '[14-16]',
                description: 'History Classes',
                createdAt: new Date()
            },
            enrollment: {
                enrolledAt: new Date()
            }
        }])


        const userEnrollments = await enrollmentsRepo.listByUser({ userId: "1" })
        expect(userEnrollments).toHaveLength(2)
    })

    it("should return empty list if user has no enrollments", async () => {
        fromMock.mockImplementation(() => ({ innerJoin: () => ({ where: whereMock }) }))
        whereMock.mockResolvedValue([])

        const userEnrollments = await enrollmentsRepo.listByUser({ userId: "2" })
        expect(userEnrollments).toEqual([])
    })
})