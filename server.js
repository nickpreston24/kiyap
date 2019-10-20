require('dotenv').config()
const express = require("express");
const path = require("path");

//NOTE: mongo-specific imports: 
const mongoose = require('mongoose');

const defaultConfig = {
    databaseType: null,
    environment: 'development',
    port: 3001
}

class Server {

    constructor() {
        this.initExpress();

        this.configure();
        this.chooseMiddleWare();
    }

    initExpress = () => {
        this.app = express();
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(express.json());

        if (this.environment === "production")
            app.use(express.static("client/build"));

        this.routes = require('./routes');
    }

    configure = () => {
        this.environment = process.env.NODE_ENV || defaultConfig.environment;
        this.dbType = process.env.SERVER_TYPE || defaultConfig.databaseType;
        this.PORT = process.env.PORT || defaultConfig.port;
        this.setUri();
    }

    setUri = () => {
        switch (this.dbType) {
            case 'sql':
            //TODO: set the sql uri here            
            case 'mongo':
                this.uri = process.env.MONGODB_URI || "mongodb://localhost/kiyapp";
            default:
                this.uri = "(none)";
        }
    }

    // Choose middleware here
    chooseMiddleWare = () => {
        console.log(this.dbType)
        switch (this.dbType) {            
            case 'mongo':
                mongoose.connect(this.uri, {
                    useNewUrlParser: true
                });
            default:
                break;
        }

        this.app.use(this.routes);
    }

    toString() {
        return `🌎  ==> API server now on port ${this.PORT}!`;
        // + !server.uri  ? server.uri : `\n database uri: ${server.uri}`;
    }

    start() {
        this.app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "./client/build/index.html"));
        });

        this.app.listen(this.PORT, () => console.log(this.toString()));
    }

}

server = new Server();
server.start();