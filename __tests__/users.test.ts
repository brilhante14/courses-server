import { afterEach, describe, expect, it, mock } from "bun:test"
import { UsersRepository } from "../src/db/repositories/users"
import { fromMock, returningMock, whereMock } from "./mocks/drizzle-orm"


const userRepo = new UsersRepository()

describe('users', () => {
  afterEach(() => {
    mock.restore()
  })

  it("should create an user", async () => {
    const newUser = { id: "1", name: "John Doe", email: 'test@email.com', password: 'senha' }
    const createdAt = new Date()

    returningMock.mockResolvedValue([{ ...newUser, createdAt }])

    const createdUser = await userRepo.create(newUser)

    expect(createdUser).toEqual({ ...newUser, createdAt })
  })

  it("should get user by id", async () => {
    const user = {
      id: "1",
      name: "John Doe",
      email: 'test@email.com',
      password: 'senha',
      createdAt: new Date()
    }

    fromMock.mockImplementation(() => ({ where: whereMock }))
    whereMock.mockResolvedValue([user])
    const fetchedUser = await userRepo.get({ id: '1' })

    expect(fetchedUser).toEqual(user)
  })

  it("should return undefined for a non-existent user", async () => {
    whereMock.mockResolvedValue([])

    const fetchedUser = await userRepo.get({ id: '1' })
    expect(fetchedUser).toBeUndefined()
  })
})