const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'baza',
    user: 'user',
    password: ''
})

module.exports = pool;