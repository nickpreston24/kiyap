import { Box, Flex } from '@chakra-ui/react';
import { values } from 'mobx';
import React, { useState } from 'react'
import { asPage } from '../../components/templates/Page';
import Group from '../../models/Group';
import WishListView from './WishListView'

let initialState = {

    users: {
        "8439": {
            id: "8439",
            name: "Jocko",
            gender: "m"
        },
        "4324": {
            id: "4324",
            name: "Candace",
            gender: 'f'
        },
        "5532": {
            id: "5532",
            name: 'Jordan',
            gender: "m"
        }
    }

    // items: [{
    //     name: "Springfield Hellcat",
    //     price: 650.99,
    //     image: 'https://i1.wp.com/frogbones.com/wp-content/uploads/2019/09/Springfield-Hellcat-OSP.png?fit=868%2C750&ssl=1'
    // },
    // {
    //     name: "Glock 19",
    //     price: 800.00,
    //     image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ITG9GO_-Qroy3VrhSaVMXQHaFK%26pid%3DApi&f=1"
    // }]
}

const group = Group.create(initialState)

const WishListPage = () => {

    const [state, setState] = useState({ selectedUser: null })
    const selectedUser = group.users.get(state.selectedUser); 

    const onUserSelect = event => setState({ ...state, selectedUser: event.target.value })

    return (

        <Flex justify='center'>

            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">

                <Flex justify='center' direction='column'>
                    <select onChange={onUserSelect}>
                        <option>- Select user -</option>
                        {values(group.users).map((user: any, idx) =>
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        )}

                    </select>
                    <h1>{selectedUser?.name || ''}</h1>
                    {selectedUser && <WishListView wishList={selectedUser.wishList} />}
                    {selectedUser && <button onClick={selectedUser.getSuggestions}>Suggestions</button>}
                </Flex>
            </Box>
        </Flex>
    )
}

export default asPage()(WishListPage)