import { destroy, types } from "mobx-state-tree";
import { WishListItem } from "./WishListItem";

export const WishList = types
    .model({
        items: types.optional(types.array(WishListItem), []),
    })
    .actions(self => ({
        add(item) {
            self.items.push(item)
        },
        remove(item) {
            console.log('item', item)
            destroy(item)
        }
    }))
    .views(self => ({
        get totalPrice() {
            return self.items.reduce((sum, entry) => sum + entry.price, 0)
        }
    }))

export default WishList;