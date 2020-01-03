module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        userName: DataTypes.STRING,
        ennodemail: DataTypes.STRING
    });

    User.associate = function(models){
        User.hasMany(models.Trip, {
            onDelete:"cascade"
        });
    };
    return User;
};