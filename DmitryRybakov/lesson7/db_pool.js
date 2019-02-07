const mysql = require("mysql");
const config = require("./config");

const pool = mysql.createPool({
	host: config.host,
	database: config.database,
	user: config.user,
	password: config.password
});

module.exports = pool;