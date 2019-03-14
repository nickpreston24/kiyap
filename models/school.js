const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schoolSchema = new Schema({
    name:{ type: String, required: true },
    address: { type: String, required: true },
    website: String,
    Phone: String
    // owner: String,
    // location: Object, //geolocation
});

const School = mongoose.model("School", schoolSchema);
module.exports = School;