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
            type: DataTypes.STRING(30),
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
    return User;
};

