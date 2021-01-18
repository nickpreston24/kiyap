module.exports = function (sequelize, DataTypes) {
    var discipline = sequelize.define("discipline", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
            unique: true,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: false
    });
    return discipline;
};