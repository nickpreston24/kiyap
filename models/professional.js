const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const professionalSchema = new Schema({
    firstName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    joinDate: {type: Date, default: Date.now},
    location: String,
    address: String,
    teaches: Array,
});

const Professional = mongoose.model("Professional", professionalSchema);
module.exports = Professional;