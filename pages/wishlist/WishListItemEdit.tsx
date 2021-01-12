import { observer } from "mobx-react-lite";

const WishListItemEdit = ({ item }) => {

    const updateField = (event) => {

        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        switch (name) {
            case 'name':
                item.changeName(value)
                break;
            case 'price':
                const price = parseFloat(value)
                if (!isNaN(price))
                    item.changePrice(price)
                break;
            case 'image':
                item.changeImage(value)
                break;
        }
    }

    return (
        <div className='item-edit'>
            Name: <input
                value={item.name}
                onChange={updateField}
                name='name'
            />
            <br />

            Price: <input
                value={item.price}
                onChange={updateField}
                name='price'
            />
            <br />

            Image: <input
                value={item.image}
                onChange={updateField}
                name='image'
            />
            <br />
        </div>
    )
}


const iconStyle = {
    iconSize: '1.25rem',
    style: {
        background: 'transparent',
        color: 'rgb(12, 124, 251)',
        border: 'transparent'
    }
}

export default observer(WishListItemEdit);