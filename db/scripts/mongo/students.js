const mongoose = require("mongoose");
const db = require("../../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kiyapp");

var students = [{
    firstName: "Michael",
    lastName: "Wazowski",
    email: "mwazki@gmail.com",
},
{
    firstName: "Janet",
    lastName: "Jameson",
    email: "janetjameson86@outlook.com",
}
]

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