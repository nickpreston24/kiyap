const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kiyapp");

var professionals = [{
        owner: "Jorge Silveus",
        teaches: ["Tae Kwon Do", "Brazilian Jiu Jitsu", "Boxing"], //FIXME: Arrays are evil
        location: "Silveus Taekwondo",
        address: "2630 Northaven Rd # 114, Dallas, TX 75229",
    },
    {
        owner: "Daniel Hines",
        location: "Krav Maga DFW",
        address: "2650 Midway Rd #204 Carrollton, TX 75006",
        teaches: ["Krav Maga", "Boxing", "Muay Thai", "Strike Fit"],
        // "1201 Turtle Creek Blvd Dallas, TX 75207"
    },
    {
        owner: "Lacy Family",
        location: "Lacy's Elite Taekwondo",
        address: "9454 N MacArthur Blvd, Irving, TX 75063",
        teaches: ["Tae Kwon Do"],
        // image: image_path
    },
    {
        owner: "Master Johnson",
        location: "Texas Blackbelt Academy",
        address: "425 N Cooper St, Arlington, TX 76011",
        phone: "(817) 274-9812",
        teaches: ["Tae Kwon Do", "Karate"]
    }
]

var students = [{
        firstName: "Michael",
        lastName: "Wazowski",
        email: "mwazki@gmail.com",
    },
    {
        firstName: "Janet",
        lastName: "Walters",
        email: "janetwalters86@outlook.com",
    }
]

// Comment one of these out at a time for now:

// db.Professional
//     .deleteMany({})
//     .then(() => db.Professional.collection.insertMany(professionals))
//     .then(data => {
//         console.log(data.result.n + " Professional records inserted!");
//         process.exit(0);
//     })
//     .catch(err => {
//         console.error(err);
//         process.exit(1);
//     });

db.Student
    .deleteMany({})
    .then(() => db.Student.collection.insertMany(students))
    .then(data => {
        console.log(data.result.n + " Student records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });