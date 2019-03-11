/* global google*/

import ControlledZoom from './ControlledZoom';
import MapWithASearchBox from './SearchBox';
import PlacesSearchBox from './Places';
import {
    MyFancyComponent,
    MyMapComponent
} from './BasicMap';
import {
    LocationSearch
} from './AutoComplete';

// const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// console.log('maps api_key: ', API_KEY)

export {
    MyMapComponent,
    MyFancyComponent,
    MapWithASearchBox,
    ControlledZoom,
    PlacesSearchBox,
    LocationSearch
};