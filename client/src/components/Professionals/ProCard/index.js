import React from 'react';
import './style.css';

//{id, name, practice, location, removePro}, ...props
export default function ProCard(props) {
    let {_id, owner, address,
        teaches, website, phone,
        location: locationName, removePro,
        image} = props;

    return (
        <div className="card">
        <div className="img-container">
            {console.log('image: ', image)}
            <img alt={locationName} src={'image'}/>
        </div>
        <div className="content">
            <ul>
                {locationName && <li><strong>{locationName}</strong></li>}
                {teaches && <li><strong>Teaches:</strong> {teaches.join(" ")}</li>}
                {address && <li><strong>Address:</strong> {address}</li>}
                {owner && <li><strong>Owner:</strong> {owner}</li>}
                {website && <li><strong>Website</strong>{website}</li>}
                {phone && <li><strong>Phone</strong>{phone}</li>}
            </ul>
        </div>

        {/* TODO: find a better button than this... */}
        {/* {console.log('id: ', _id)} */}
        {/* <span onClick={_ => removePro(_id)} className="remove">
            𝘅
        </span> */}
        </div>
    )
}
