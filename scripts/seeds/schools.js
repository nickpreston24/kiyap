const mongoose = require("mongoose");
const db = require("../../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kiyapp");

//TODO: make this seeding dynamic by calling google's Places API.
//These will be known & recorded locations that Students have found using our app, just like TX 3006.

var schools = [{

    // //From Google:
    // "location" : {
    //     "lat" : -33.866891,
    //     "lng" : 151.200814
    // },

},

]

db.School
    .deleteMany({})
    .then(() => db.School.collection.insertMany(schools))
    .then(data => {
        console.log(data.result.n + " School records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });