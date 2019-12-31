module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: DataTypes.STRING,
        email: DataTypes.STRING
    });

    User.associate = function(models){
        User.hasMany(models.Trip, {
            onDelete:"cascade"
        });
    };
    return User;
};