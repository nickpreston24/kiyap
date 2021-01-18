import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { WishListItem } from '../../models/WishListItem';
import WishListItemEdit from './WishListItemEdit';

const WishListItemEntry = ({ wishList }) => {

    const [state, setState] = useState({
        entry: WishListItem.create({
            name: "",
            price: 0
        })
    })

    const onAdd = () => {
        wishList.add(state.entry)
        setState({
            ...state,
            entry: WishListItem.create({
                name: "",
                price: 0
            })
        })
    }

    return (
        <Stack>
            <Heading size='md'>Add new item to wishlist</Heading>
            <WishListItemEdit item={state.entry} />
            <Button onClick={onAdd}>Submit</Button>
        </Stack>
    )

};

export default WishListItemEntry
