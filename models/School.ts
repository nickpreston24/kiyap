import { destroy, types } from "mobx-state-tree";
import { Instructor } from "./Instructor";
import Student from "./Student";

export const Discipline = types.model({
    name: types.string,
})

export const Image = types.model({
    url: types.string
})

export const School = types.model({
    id: types.string,
    name: types.maybe(types.string),
    description: types.optional(types.string, ''),
    image: types.maybe(Image),
    // image: types.maybe(types.compose( types.string )),
    // image: {url:types.string}
    address: types.maybe(types.string),
    students: types.array(Student),
    disciplines: types.array(Discipline),
    instructors: types.array(Instructor),
})
    .actions(self => ({
        register(student) {
            // self.students.put(student)
            self.students.push(student)
        },
        expell(student) {
            destroy(student)
        },
        like(userId) {
            //TODO: Like by the id of a User
        },
        getLikes() {
            // TODO: Get all Users who like it and 
        }
    }))
    .views(self => ({
        get studentCount() {
            // return self.students.size
            return self.students.length
        },
        get averageAge() {
            return self.students.length > 0 ?
                self.students
                    .reduce((sum, student) => sum + student.age, 0)
                / self.students.length
                : 'No Students'
        },
        get isLiked() {
            return true;
        }
    }))



export default School