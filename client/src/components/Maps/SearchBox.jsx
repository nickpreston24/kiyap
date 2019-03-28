

function createMapOptions(maps) {
  return {
    "styles": [
      {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "color": "#f49f53"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              },
              {
                  "saturation": "43"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "hue": "#ff0000"
              },
              {
                  "saturation": "42"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#feeada"
              },
              {
                  "lightness": -7
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#645c20"
              },
              {
                  "lightness": 38
              }
          ]
      },
      {
          "featureType": "poi.government",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#9e5916"
              },
              {
                  "lightness": 46
              }
          ]
      },
      {
          "featureType": "poi.medical",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#813033"
              },
              {
                  "lightness": 38
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "all",
          "stylers": [
              {
                  "lightness": "-27"
              },
              {
                  "saturation": "-31"
              },
              {
                  "hue": "#aaff00"
              }
          ]
      },
      {
          "featureType": "poi.school",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#a95521"
              },
              {
                  "lightness": 35
              }
          ]
      },
      {
          "featureType": "poi.sports_complex",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#9e5916"
              },
              {
                  "lightness": 32
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#ff1744"
              },
              {
                  "lightness": "20"
              },
              {
                  "weight": "0.5"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              },
              {
                  "weight": "6"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#f19f53"
              },
              {
                  "visibility": "on"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#f19f53"
              },
              {
                  "lightness": -10
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "saturation": "6"
              },
              {
                  "lightness": "-37"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#fffcfc"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "lightness": 38
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#813033"
              },
              {
                  "lightness": 22
              }
          ]
      },
      {
          "featureType": "transit.station",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#007ba6"
              },
              {
                  "saturation": "-44"
              },
              {
                  "gamma": 0.99
              },
              {
                  "lightness": 43
              }
          ]
      }
  ]
  }
}

export default MapWithASearchBox;