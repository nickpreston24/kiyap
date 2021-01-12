import { getParent, IAnyStateTreeNode, types } from "mobx-state-tree";

export const Student = types
    .model({
        id: types.string,
        name: types.string,
        age: types.number,
        gender: types.string,
    })
    .actions(self => ({
        changeName(text) {
            self.name = text
        },
        changeAge(age) {
            self.age = age
        },
        remove() {
            (getParent(self, 2) as IAnyStateTreeNode).remove(self)
        }
    }))

export default Student;