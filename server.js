const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
// const {API_KEY} = require('./client/src/constants/keys');
const API_KEY = 'AIzaSyDErcavr_Zf0a0A-5tK5OZ38YO5JblIxWM';
console.log('api key: ', API_KEY);
// Define middleware here
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");



// TODO: Require API routes here:

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => console.log(`🌎  ==> API server now on port ${PORT}!`));