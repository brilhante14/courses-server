import { jest, mock } from "bun:test"

export const returningMock = jest.fn()
export const whereMock = jest.fn()
export const fromMock = jest.fn()

mock.module('drizzle-orm/neon-http', () => ({
    drizzle: () => ({
        insert: () => ({
            values: () => ({
                returning: returningMock
            })
        }),
        select: () => ({
            from: fromMock
        })
    }),
}))
