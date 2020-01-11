module.exports = function (sequelize, DataTypes) {
    var Trip = sequelize.define("Trip", {
        tripName: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    });

    Trip.associate = function(models){

        Trip.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
              }
        });
        Trip.hasMany(models.Stop, {
            foreignKey: {
                allowNull : false
            }
        })
    };
    return Trip;
};