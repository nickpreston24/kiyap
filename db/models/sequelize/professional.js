module.exports = function (sequelize, DataTypes) {
    var professional = sequelize.define("professional", {
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
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },
        SchoolId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: [1]
            }
        }
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

    return professional;
}