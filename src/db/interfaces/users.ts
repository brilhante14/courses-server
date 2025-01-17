import type { User as UserModel } from "../../models/user"
import type { User } from "../models/schema"

export interface CreateUserRepository {
    create(params: CreateUserRepository.Params): Promise<CreateUserRepository.Return>
}

export namespace CreateUserRepository {
    export type Params = typeof User.$inferInsert

    export type Return = Omit<UserModel, 'password'>
}

export interface GetUserRepository {
    get(params: GetUserRepository.Params): Promise<GetUserRepository.Return>
}

export namespace GetUserRepository {
    export type Params = { id: UserModel['id'] }

    export type Return = UserModel | undefined
}