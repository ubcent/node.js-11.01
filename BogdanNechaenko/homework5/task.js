const mysql = require('mysql');
const config = require('./config');

class Task {
	static getAll(){
		return new Promise((resolve, reject) => {
			config.getConnection((err, connection) => {
				if(err) {
					reject(err);
				}
				connection.query('SELECT * FROM `tasks`', (err,rows) => {
					connection.release();
					if(err) {
						reject(err);
					}
					resolve(rows);
					console.log(rows);
				});
			});
		});
	}

	static getById(taskid){
		return new Promise((resolve, reject) => {
			config.getConnection((err, connection) => {
				if(err){
					reject(err);
				}

				connection.query('SELECT * FROM `tasks` WHERE `id` = ? LIMIT 1', task, (err, rows) => {
					connection.release();

					if(err){
						reject(err);
					}	

					resolve(rows);
				});
			});
		});
	}

	static add(){

	}

	static remove(){

	}

	static update(){

	}

	static complete(){

	}

	static prioritize(){

	}
}

module.exports = Task;