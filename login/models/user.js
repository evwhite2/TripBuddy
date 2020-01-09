const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize('tripBuddy_db', 'root', '', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min:0,
        acquire: 30000,
        idle: 10000 //in milliseconds
    },
    operatorAliases: false
});

var User = sequelize.define("User", {
    firstName: Sequelize.STRING(30),
    lastName: Sequelize.STRING(30),
    userName: {
        type: Sequelize.STRING(30),
        allowNull : false,
     //   unique: true --incorporate later
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull : false
      //  unique: true          --incorporate later when not using test@test.com
    },
    password: {
        type: Sequelize.STRING,
        allowNull : false
    }
});

//join user with trip
User.associate = function(models){
    User.hasMany(models.Trip, {
        onDelete:"cascade"
    });
};

//creates encrypted password -- will save in db as random symbols and letters
User.beforeCreate((user, options)=> {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
});

//password validation
User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

sequelize.sync()
    .then(()=>console.log('user table created'))
    .catch(error=>console.log(error));

module.exports = User;