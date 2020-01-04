module.exports = function (sequelize, DataTypes) {
    var Stop = sequelize.define("Stop", {
        stopName: {
            type: DataTypes.STRING,
            allowNull: false
          }
    });

    Stop.associate = function(models){
        Stop.belongsTo(models.Trip, {
            foreignKey: {
                allowNull: false
              }
        });
    };
    return Stop;
};