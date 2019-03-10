const mongoose = require("mongoose");
const db = require("../../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kiyapp");

//TODO: make this seeding dynamic by calling google's Places API.
//These will be known & recorded locations that Students have found using our app, just like TX 3006.
var locations = [{

    //From Google:
    "location" : {
        "lat" : -33.866891,
        "lng" : 151.200814
    },

},

]

db.Location
    .deleteMany({})
    .then(() => db.Location.collection.insertMany(locations))
    .then(data => {
        console.log(data.result.n + " Location records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });