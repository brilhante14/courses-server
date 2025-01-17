import type { Course as CourseModel } from "../../models/course"
import type { Course } from "../models/schema"

export interface CreateCourseRepository {
    create(params: CreateCourseRepository.Params): Promise<CreateCourseRepository.Return>
}

export namespace CreateCourseRepository {
    export type Params = typeof Course.$inferInsert

    export type Return = CourseModel
}

export interface ListCoursesRepository {
    list(params: ListCoursesRepository.Params): Promise<ListCoursesRepository.Return>
}

export namespace ListCoursesRepository {
    export type Params = void

    export type Return = CourseModel[]
}

export interface GetCourseByIdRepository {
    getById(params: GetCourseByIdRepository.Params): Promise<GetCourseByIdRepository.Return>
}

export namespace GetCourseByIdRepository {
    export type Params = Pick<CourseModel, 'id'>

    export type Return = CourseModel | undefined
}