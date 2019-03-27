import React from 'react'
import { withAuthorization } from '../Session'
import { MapWithASearchBox } from '../Maps';
import { SchoolSearch } from '../Professionals';
import { LocationStore } from '../Stores';
import { withFlexColumn, withFlexRow } from '../Flex';

const store = new LocationStore();
const HomePage = () => (
    <div>
        <MapWithASearchBox store={store}/>
        <SchoolSearch store={store}/>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);