import type { Course } from "../../models/course"
import type { Enrollment } from "../../models/enrollment"
import type { User } from "../../models/user"

export interface EnrollUserRepository {
    enroll(params: EnrollUserRepository.Params): Promise<EnrollUserRepository.Return>
}

export namespace EnrollUserRepository {
    export type Params = {
        userId: User['id']
        courseId: Course['id']
    }

    export type Return = Enrollment
}

export interface ListUserEnrollmentsRepository {
    listByUser(params: ListUserEnrollmentsRepository.Params): Promise<ListUserEnrollmentsRepository.Return>
}

export namespace ListUserEnrollmentsRepository {
    export type Params = {
        userId: User['id']
    }

    export type Return = (Course & Pick<Enrollment, 'enrolledAt'>)[]
}