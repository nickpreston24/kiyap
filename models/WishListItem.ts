import { types, getParent, IAnyStateTreeNode } from "mobx-state-tree"

export const WishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: ''
    })
    .actions(self => ({
        changeName(text) {
            self.name = text
        },
        changePrice(amount) {
            self.price = amount
        },
        changeImage(img) {
            self.image = img
        },
        remove() {
            (getParent(self, 2) as IAnyStateTreeNode).remove(self)
        },
    }))