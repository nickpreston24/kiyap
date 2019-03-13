import React from 'react'
import { withAuthorization } from '../Session'
import { MapWithASearchBox } from '../Maps';
import {ProSearch} from '../Professionals';
import LocationStore from '../Stores/ProStore';

const store = new LocationStore();

const HomePage = () => (
    <div>
        <MapWithASearchBox store={store}/>
        <ProSearch testprop={"hi, i am a prop!"} store={store}/>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);