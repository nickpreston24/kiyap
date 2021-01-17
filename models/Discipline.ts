import { types } from "mobx-state-tree/dist/types";
import School from "./School";

export const Discipline = types.model({
    slug: types.maybe(types.string),
    name: types.string,
    description: types.maybe(types.string),
    schools: types.maybe(types.map(School))
})
    .actions(self => ({
        setDescription(newDescription) {
            if (!!newDescription)
                self.description = newDescription
        }
    }))