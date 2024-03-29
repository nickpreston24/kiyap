var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var environment = process.env.NODE_ENV || "development";
var config = require(__dirname + "/config.json")[environment];
var db = {};

if (config.use_env_value) {
    var sequelize = new Sequelize(process.env[config.use_env_value]);
} else {
    let password = config.password || process.env.Password;
    var sequelize = new Sequelize(config.database, config.username, password, config);
}

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
    })
    .forEach(function (file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;