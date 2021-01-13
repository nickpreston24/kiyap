import { observer } from "mobx-react-lite"
import { applySnapshot, clone, getSnapshot } from "mobx-state-tree"
import { useState } from "react"
import WishListItemEdit from "./WishListItemEdit"
import { GoTrashcan } from 'react-icons/go'
import { Heading, ListItem, Button, Text } from '@chakra-ui/react'
import { AiOutlineEdit } from 'react-icons/ai'

const iconStyle = {
    size: '1.25rem',
    style: {
        background: 'transparent',
        color: 'rgb(12, 124, 251)',
        border: 'transparent'
    }
}

export const WishListItemView = ({ item }) => {

    const [state, setState] = useState({ isEditing: false, clone: null })
    const toggleEdit = () => setState({ ...state, isEditing: true, clone: clone(item) })
    const cancelEdit = () => setState({ ...state, isEditing: false })
    const save = () => {
        applySnapshot(item, getSnapshot(state.clone))
        setState({
            ...state,
            isEditing: false,
            clone: null
        })
    }

    if (!item)
        return null

    if (!!state.isEditing) {
        return (<li>
            <WishListItemEdit item={state.clone} />
            <button onClick={save}>save</button>
            <button onClick={cancelEdit}>x</button>
        </li>)
    }

    else return (
        <ListItem
            color="green"
            className="item" style={{ listStyleType: 'none' }}>
            {item.image && <img src={item.image}
                height='100px'
            />}
            <Heading size='sm'>{item.name}</Heading>
            <Text>{item.price}</Text>
            <Button
                {...iconStyle}
                onClick={toggleEdit}>
                <AiOutlineEdit
                    size={iconStyle.size}
                />
            </Button>
            <Button {...iconStyle}
                onClick={item.remove}>
                <GoTrashcan size={iconStyle.size} />
            </Button>
        </ListItem>
    )
}

export default observer(WishListItemView)