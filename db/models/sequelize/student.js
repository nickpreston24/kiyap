module.exports = function (sequelize, DataTypes) {
    var student = sequelize.define("student", {
        Id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            autoIncrement: true,
            validate: {
                len: [1]
            }
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // TODO: Uncomment when you can relate this to Firebase
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isEmail: true
        //     }
        // },

    }, {
        timestamps: false
    });

    return student;
}