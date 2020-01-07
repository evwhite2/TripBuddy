const pool = require('./pool');
const bcrypt = require('bcrypt');


function User(){};

User.prototype = {
    // find user data by id or username
    find : function(user = null, cb) {
        if(user) {
            var field = Number.isInteger(user) ? 'id' : 'username';       
         }

         //sql query
         let sql = `SELECT * FROM users WHERE ${field} = ?`;

         pool.query(sql, user, function(err, result) {
             if(err) throw (err)
             
             if(result.length) {
                 cb(result[0]);

             } else {
                 cb(null);
             }
         });
    },

    create: function(body, cb) {
        var pwd = body.password;
        console.log(pwd)
        body.password = bcrypt.hashSync(pwd, 10);

        var bind = [];

        for(prop in body) {
            bind.push(body[prop]);
        }
        
        let sql = `INSERT INTO users (username, name, password, email, address) VALUES (?, ?, ?, ?, ?)`;
        
        pool.query(sql, bind, function(err, result) {
            if (err) throw (err);
            cb (result.insertId);
        });
    },

    login: function(username, password, cb) {
        this.find(username, function(user) {
            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    cb(user);
                    return;
                };
            }
            cb(null);
        })
    }
}

module.exports = User;