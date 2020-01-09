const Sequelize = require("sequelize");

var Trip = sequelize.define("Trip", {
    tripName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Trip.associate = function(models){
    Trip.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
          }
    });
};

module.exports = Trip;