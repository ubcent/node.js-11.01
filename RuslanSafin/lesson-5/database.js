const mysql =       require('mysql2');

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123123',
    database : 'shoplist'
  });

  module.exports = pool.promise();