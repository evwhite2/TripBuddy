module.exports = function (sequelize, DataTypes) {
    var Trip = sequelize.define("Trip", {
        tripName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startPt: {
                type: DataTypes.STRING
            },
        midPt: {
                type: DataTypes.STRING
            },
        endPt: {
                type: DataTypes.STRING
            }
    });

    Trip.associate = function(models){
        Trip.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
              }
        });
    };

    return Trip;
};