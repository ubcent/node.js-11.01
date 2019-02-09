<<<<<<< HEAD
const mysql = require('mysql');

	const pool = mysql.createPool({
		host: 'localhost',
		port: '3307',
		database: 'todo',
		user: 'root',
		password: 'bogdan'
	});

=======
const mysql = require('mysql');

	const pool = mysql.createPool({
		host: 'localhost',
		port: '8880',
		database: 'todo',
		user: 'root',
		password: 'bogdan'
	});

>>>>>>> 2e5490a2986ce1fafb162b99345c9588281b47f9
module.exports = pool;