const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'todo',
    user: 'root',
    password: '',
});

module.exports = pool;