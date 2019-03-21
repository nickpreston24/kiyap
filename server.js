const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// Serve up static assets (usually on heroku)
let uri = "mongodb://localhost/kiyapp";

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    uri = process.env.MONGODB_URI
}

mongoose.connect(uri, {
    useNewUrlParser: true
});

// TODO: refactor this api-routes.js to an export bundle for app.use();
require('./routes/api/sql/api-routes.js')(app);
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => console.log(`🌎  ==> API server now on port ${PORT}!\n db uri: ${uri}`));