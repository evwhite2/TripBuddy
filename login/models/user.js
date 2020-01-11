const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: DataTypes.STRING(30),
        lastName: DataTypes.STRING(30),
        userName: {
            type: DataTypes.STRING(30),
            allowNull : false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull : false
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull : false
          //  unique: true  --incorporate later when not using test@test.com
        }
    });

    User.associate = function(models){
        User.hasMany(models.Trip, {
            onDelete:"cascade"
        });
    };

    //creates encrypted password
    User.beforeCreate((user, options)=> {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
    });

    //password validation
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password)
    };

    return User;
};