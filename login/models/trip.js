const Sequelize = require("sequelize");
const sequelize = require("../config/database");

var Trip = sequelize.define("Trip", {
    tripName: {
        type: Sequelize.STRING
        // allowNull: false
    },
    startPt: {
        type: Sequelize.STRING
    },
    midPt: {
        type: Sequelize.STRING
    },
    endPt: {
        type: Sequelize.STRING
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