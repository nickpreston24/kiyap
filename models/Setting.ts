import { values } from 'mobx'
import { types } from 'mobx-state-tree'
import { User } from './Group'

export const Setting = types.model({
    name: types.string,
    description: types.optional(types.string, ''),
    tooltip: types.optional(types.string, ''),
    enabled: false,
    createdDate: types.optional(types.Date, () => new Date()),
})
    .actions(self => ({
        toggle() {
            self.enabled = !self.enabled
        }
    }))

/* A named collection of Settings */
export const Section = types.model({
    name: types.optional(types.string, ''),
    settings: types.map(Setting)
})

export const Profile = types.model({
    // user: types.optional(User, {}), 
    sections: types.map(Section),
})
    .views(self => ({
        get isDev() {

            let first = values(self.sections)
                .map(section => values((section as any).settings))
                .reduce((a, v) => a.concat(v), [])
                .find(x => x.name === 'Dev Mode')

            // console.log('first', first)

            return first.enabled;
        }
    }))

export default Setting