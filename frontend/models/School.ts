import axios from "axios";
import { remove } from "lodash";
import { destroy, flow, getParent, IAnyStateTreeNode, types } from "mobx-state-tree";
import { Logger } from "utils/Logger";
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
        },
        delete() {
            (getParent(self, 2) as IAnyStateTreeNode).remove(self)
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
        },
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
                    Logger.Log(response.error, "Saving a new school")

                school.id = response.data.id.toString();
                self.schools.push(school)

                console.log('self.schools', self.schools.length)
            }),

            remove: flow(function* (data) {
                let school = data?.toJSON() || {};
                // console.log('removing db school :>> ', school)

                const config = {
                    method: "DELETE",
                    // headers: { "Content-Type": "application/json" },
                    url: self.endpoint + '/' + school.id,
                } as any;

                console.log('config', config)

                const response = yield axios.delete(
                    config.url,
                    config
                )

                if (response.error)
                    Logger.Log(response.error, "Deleting a school")

                destroy(data)
            })
        }
    })

export default School