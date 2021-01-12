import { types } from 'mobx-state-tree'
import School from './School'

export const Instructor = types.model({
    name: types.string,
    // students: types.optional(types.array(Student), []),
    // school: School
})