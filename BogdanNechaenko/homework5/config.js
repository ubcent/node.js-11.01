const mysql = require('mysql');

	const pool = mysql.createPool({
		host: 'localhost',
		port: '8880',
		database: 'todo',
		user: 'root',
		password: 'bogdan'
	});

module.exports = pool;