/* global google */

// *** Search Box ***
import React from 'react';
import API from '../../utils/API';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
// const startCoordinates = {lat: 32.7767, lng: 96.7970 };

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      this.store = this.props.store;
      //   this.getGeoLocation();
      API.getDisciplines()
        .then(result=>{
            this.setState({disciplines: result.data.map(d => d.Name)})
            console.log('disciplines: ', result.data.map(d => d.Name));
        })

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
            // console.log('bounds changed()')
            // let bnds  = refs.map.getBounds();
            // let cntr = refs.map.getCenter();
            // console.log('new bounds: ', bnds, 'new center', cntr);
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          //   *** PLACES ***
          //   console.log('maps found places: ', places);
          this.store.addSchools(places);
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
          const nextState = {
            center: nextCenter,
            markers: nextMarkers,
          };
          this.setState(nextState);
        //   refs.map.fitBounds(bounds);
        },
      })
    },
    componentDidMount() {
        // console.log('wrapper has store?', !!this.props.store)
        // this.delayedShowMarker()
    },
    componentWillUpdate() {
        // this.getGeoLocation()
    },

    getGeoLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              })
              console.log('geo position: ', position)
            }
          )
        } else {
        //   error => console.log(error)
        }
      }

  }),
  withScriptjs,
  withGoogleMap
)(props =>
    <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    // center={{ lat: props.lat, lng: props.lng }}
    onBoundsChanged={props.onBoundsChanged}
    clickableIcons={true}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search Dojos"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />)}

  </GoogleMap>
);

export default MapWithASearchBox;