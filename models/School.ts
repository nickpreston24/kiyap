import { destroy, types } from "mobx-state-tree";
import { Instructor } from "./Instructor";
import Student from "./Student";

export const School = types.model({
    id: types.string,
    address: types.string,
    // instructors: types.array(Instructor),
    // students: types.array(Student),
    students: types.map(Student)
})
    .actions(self => ({
        register(student) {
            self.students.put(student)
        },
        expell(student) {
            destroy(student)
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