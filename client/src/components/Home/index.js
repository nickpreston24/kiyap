
import React, {Component} from 'react'
import { withAuthorization } from '../Session'
// import { LocationSearch, MyMapComponent, MyFancyComponent, MapWithASearchBox, MapWithControlledZoom, PlacesSearchBox } from '../Maps';
// import Counter from './Counter'
// import MobxTable from './MobxTable';

import ProSearch from '../ProSearch';

const HomePage = () => (
    <div>
        {/* <h1>Home Page (powered by Maps)</h1> */}
        {/* <p>Accessible by signed in users</p> */}
        {/* <MyMapComponent/> */}
        {/* <Counter/> */}
        {/* <MobxTable/> */}
        <ProSearch/>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);