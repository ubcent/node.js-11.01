const mysql = require('mysql');

const pool = mysql.createPool({
    host: 's02.host-food.ru',
    database: 'h100349_baza',
    user: 'h100349_user',
    password: ''
})

module.exports = pool;