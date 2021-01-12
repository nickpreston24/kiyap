import { Box, Flex, Heading, List } from "@chakra-ui/react";
import { values } from "mobx";
import React from "react";
import { FC } from "react";
import WishListItemEntry from "./WishListItemEntry";
import WishListItemView from "./WishListItemView";

type Props = {
    wishList: any
}
export const WishListView: FC<Props> = (({ wishList }) => {
    console.log('wishList', wishList)

    if (!wishList)
        return null;

    return (
        <Box>
            <Heading>Wishlist</Heading>
            <List>
                {values(wishList.items).map((item, key) => <WishListItemView key={key} item={item} />)}
            </List>
            Total: ${wishList.totalPrice}
            <WishListItemEntry wishList={wishList} />
            <footer>{JSON.stringify(wishList)}</footer>
        </Box>

    )
})

export default WishListView