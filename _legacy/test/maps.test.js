//TODO: mocha
//MAPS tests:

const googleMapsClient = require('@google/maps').createClient({
    key: API_KEY,
    Promise: Promise
});
console.log('client: ', !!googleMapsClient);

googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
})
.asPromise()
.then((response) => {
    console.log(response.json.results);
})
.catch((err) => {
    console.log(err);
});


// console.log(API_KEY);

// const mapCenter = new google.maps.LatLng(-33.8617374,151.2021291)

// const map = new google.maps.Map(document.getElementById('map'), {
//   center: mapCenter,
//   zoom: 15
// })

// const placeService = new google.maps.places.PlacesService(map)

// const request = {
//   query: 'japan',
//   fields: ['place_id', 'name', 'formatted_address', 'icon', 'geometry'],
// }

// placeService.findPlaceFromQuery(request, (results, status) => {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {

//     results.forEach((item) => {
//       console.log(item)
//       // place_id, name, formatted_address, geometry.location, icon
//     });
//   }
// })



// const mapsClient  = require('@google/maps').createClient({ key: API_KEY });
// const googleMapsClient = require('@google/maps').createClient({
//     key: API_KEY,
//     Promise: Promise
//   });

//   googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
//     .asPromise()
//     .then((response) => {
//       console.log(response.json.results);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
