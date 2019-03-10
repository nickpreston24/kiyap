
import React from 'react'
import { withAuthorization } from '../Session'
import { LocationSearch, MyMapComponent, MyFancyComponent, MapWithASearchBox, MapWithControlledZoom, PlacesSearchBox } from '../Maps';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>Accessible by signed in users</p>

        {/* <LocationSearch/> */}
        {/* <MyFancyComponent/> */}
        {/* <PlacesSearchBox/> */}
        {/* <MyMapComponent isMarkerShown/> */}
        {/* <MapWithASearchBox/> */}
        {/* <MapWithControlledZoom/> */}
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);