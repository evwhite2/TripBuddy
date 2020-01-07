const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: ''//your pass,
    database: 'nodelogin'
});

pool.getConnection((err, connection)=> {
    if(err)
        console.error('error in connecting to database');
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;