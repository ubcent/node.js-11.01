const mysql = require('mysql');

const pool = mysql.createPool({
    host: 's02.host-food.ru',
    database: 'h100349_baza',
    user: 'h100349_eko',
    password: 'ekoska123'
})

module.exports = pool;