import { flow, types } from 'mobx-state-tree'
import WishList from './WishList'

export const User = types.model({
    id: types.string,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {})
})
    .actions(self => ({
        getSuggestions: flow(function* () {
            const response = yield fetch(`http://localhost:${process.env.PORT || 8000}/suggestions_${self.gender}`)
            const suggestions = yield response.json()
            self.wishList.items.push(...suggestions)
        })
    }))

export const Group = types.model({
    users: types.map(User)
})


export default Group;