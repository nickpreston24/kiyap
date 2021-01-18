import axios from "axios";
import { destroy, flow, types } from "mobx-state-tree";
import { Instructor } from "./Instructor";
import Student from "./Student";

const ENDPOINT = `${process.env.ENDPOINT || "http://localhost:1337"}/schools`

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
    image: types.maybeNull(Image),
    // image: types.maybe(types.compose( types.string )),
    // image: {url:types.string}
    address: types.maybeNull(types.string),
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
                : null
        },
        get isLiked() {
            return true;
        }
    }))

export const SchoolStore = types.model("SchoolStore", {
    loaded: types.maybeNull(types.boolean),
    schools: types.array(School),
    endpoint: ENDPOINT,
})
    .actions(self => {
        return {
            addSchool: flow(function* (school) {
                console.log('adding school :>> ', school)
                const config = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    url: self.endpoint,
                } as any;

                if (!school) return;


                const response = yield axios.post(
                    self.endpoint,
                    school,
                    config
                )

                console.log('response.data', response.data)

                if (response.error)
                    console.error('School could not be saved.  Please contact your administrator' + response.error)
                else
                    console.info('School saved successfully')

                self.schools.push({
                    ...school,
                    id: (response.data.id).toString()
                })
                console.log('self.schools', self.schools.length)
            })
        }
    })

export default School