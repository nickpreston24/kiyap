import { destroy, types } from "mobx-state-tree";
import { Instructor } from "./Instructor";
import Student from "./Student";

export const Discipline = types.model({
    name: types.string,
})

export const School = types.model({
    id: types.string,
    name: types.maybe(types.string),
    image: types.maybe(types.string),
    address: types.string,
    isLiked: false,
    students: types.map(Student),
    disciplines: types.map(Discipline),
    // instructors: types.array(Instructor),
})
    .actions(self => ({
        register(student) {
            self.students.put(student)
        },
        expell(student) {
            destroy(student)
        },
        like() {
            self.isLiked = !self.isLiked
            console.log('self.isLiked', self.isLiked)
            // console.log('value', value)
        }
    }))
    .views(self => ({
        get studentCount() {
            return self.students.size
        },
        // get averageAge() {
        //     // return self.students.reduce((sum, student) => sum + student.age, 0) / self.students.length
        //     // return self.students.values().reduce((sum, student) => sum + student.age, 0) / self.students.length
        //     return -1;
        // }
    }))



export default School