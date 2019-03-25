const mongoose = require("mongoose");
const db = require("../../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kiyapp");

var professionals = [{
        firstName: "Jorge",
        lastName: "Silveus",
        school: "Silveus Taekwondo",
        address: "2630 Northaven Rd # 114, Dallas, TX 75229",
        teaches: ["Tae Kwon Do", "Brazilian Jiu Jitsu", "Boxing"],
    },
    {
        firstName: "Daniel",
        lastName: "Hines",
        school: "Krav Maga DFW",
        address: "2650 Midway Rd #204 Carrollton, TX 75006",
        teaches: ["Krav Maga", "Boxing", "Muay Thai", "Strike Fit"],
        // "1201 Turtle Creek Blvd Dallas, TX 75207"
    },
    {
        firstName: "Jenny",
        lastName: "Lacy",
        school: "Lacy's Elite Taekwondo",
        address: "9454 N MacArthur Blvd, Irving, TX 75063",
        teaches: ["Tae Kwon Do"],
        // image: image_path
    },
    {
        firstName: "Dave",
        lastName: "Johnson",
        school: "Texas Blackbelt Academy",
        address: "425 N Cooper St, Arlington, TX 76011",
        phone: "(817) 274-9812",
        teaches: ["Tae Kwon Do", "Karate"]
    }
]


db.Professional
    .deleteMany({})
    .then(() => db.Professional.collection.insertMany(professionals))
    .then(data => {
        console.log(data.result.n + " Professional records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });