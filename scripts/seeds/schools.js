const mongoose = require("mongoose");
const db = require("../../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kiyapp");

//IDEA: I could make this seeding dynamic by calling google's Places API.

//These will be known & recorded locations that Students have found using our app, just like TX 3006.

// //From Google:
// "location" : {
//     "lat" : -33.866891,
//     "lng" : 151.200814
// },

var schools = [{
        name: "Silveus Taekwondo",
        address: "2630 Northaven Rd # 114, Dallas, TX 75229",
        teaches: ["Tae Kwon Do", "Brazilian Jiu Jitsu", "Boxing"],
    },
    {
        name: "Krav Maga DFW",
        address: "2650 Midway Rd #204 Carrollton, TX 75006",
        teaches: ["Krav Maga", "Boxing", "Muay Thai", "Strike Fit"],
    },
    {
        name: "Lacy's Elite Taekwondo",
        address: "9454 N MacArthur Blvd, Irving, TX 75063",
        teaches: ["Tae Kwon Do"],
    },
    {
        name: "Texas Blackbelt Academy",
        address: "425 N Cooper St, Arlington, TX 76011",
        phone: "(817) 274-9812",
        teaches: ["Tae Kwon Do", "Karate"]
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