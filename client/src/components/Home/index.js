
import React from 'react'
import { withAuthorization } from '../Session'
import { LocationSearch, MyMapComponent, MyFancyComponent, MapWithASearchBox, MapWithControlledZoom, PlacesSearchBox } from '../Maps';
// const API_KEY  = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// console.log('maps api_key: ', API_KEY)
// const mapUrl= `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;

const HomePage = () => (
    <div>
        <h1>Home Page (powered by Maps)</h1>
        <p>Accessible by signed in users</p>

        <MyMapComponent/>
        {/* <MapWithASearchBox/> */}

    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);