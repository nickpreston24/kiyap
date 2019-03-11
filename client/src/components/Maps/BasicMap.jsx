import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const startPosition = { lat: -34.397, lng: 150.644 };

const API_KEY  = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// *** BASE ***
 export const MyMapComponent = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
  <GoogleMap
      defaultZoom={8}
      defaultCenter={startPosition}
    >
      {/* {console.log('url:', this.props.url)} */}
      {console.log('props: ', props)}
      {props.isMarkerShown && <Marker position={startPosition} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )

  // *** Sample ***
 export class MyFancyComponent extends React.PureComponent {
    state = {
      isMarkerShown: false,
    }

    componentDidMount() {
      this.delayedShowMarker()
    }

    delayedShowMarker = () => {
      setTimeout(() => {
        this.setState({ isMarkerShown: true })
      }, 3000)
    }

    handleMarkerClick = () => {
      this.setState({ isMarkerShown: false })
      this.delayedShowMarker()
    }

    render() {
      return (
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
      )
    }
  }