const mysql = require('mysql');

	const pool = mysql.createPool({
		host: 'localhost',
		port: '3307',
		database: 'todo',
		user: 'root',
		password: 'bogdan'
	});

module.exports = pool;