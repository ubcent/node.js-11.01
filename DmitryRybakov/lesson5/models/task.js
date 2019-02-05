const db_pool = require("../db_pool");


class Task{
	
	static getAll(){
		return new Promise((resolve, reject) => {
			db_pool.getConnection((err, connection) => {
				if(err){
					reject(err);
				}
				
				connection.query('SELECT * FROM `tasks`', (err, rows) => {
					connection.release();
					
					if(err){
						reject(err);
					}	
					
					resolve(rows);
				});
			});
		});
	}
	
	static getById(task){
		return new Promise((resolve, reject) => {
			db_pool.getConnection((err, connection) => {
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
	
	static remove(task){
		return new Promise((resolve, reject) => {
			db_pool.getConnection((err, connection) => {
				if(err){
					reject(err);
				}
				
				connection.query('DELETE FROM `tasks` WHERE `id` = ?', task, (err, result) => {
					connection.release();
					
					if(err){
						reject(err);
					}	
					
					resolve(result);
				});
			});
		});
	}
	
	static update(task){
		return new Promise((resolve, reject) => {
			db_pool.getConnection((err, connection) => {
				if(err){
					reject(err);
				}
				
				connection.query('UPDATE `tasks` SET `title` = ?, `status` = ?, `priority` = ? WHERE `id` = ?', task, (err, result) => {
					connection.release();
					
					if(err){
						reject(err);
					}	
					
					resolve(result);
				});
			});
		});
	}
	
	static add(task){
		return new Promise((resolve, reject) => {
			db_pool.getConnection((err, connection) => {
				if(err){
					reject(err);
				}
				
				connection.query('SELECT * FROM `tasks` SET ?', task, (err, result) => {
					connection.release();
					
					if(err){
						reject(err);
					}	
					
					resolve(result);
				});
			});
		});
	}
	
	static complete(task){
		return new Promise((resolve, reject) => {
			db_pool.getConnection((err, connection) => {
				if(err){
					reject(err);
				}
				
				connection.query('UPDATE `tasks` SET `status` = 1 WHERE `id` = ?', task, (err, result) => {
					connection.release();
					
					if(err){
						reject(err);
					}	
					
					resolve(result);
				});
			});
		});
	}
	
	static setPriority(task){
		return new Promise((resolve, reject) => {
			db_pool.getConnection((err, connection) => {
				if(err){
					reject(err);
				}
				
				connection.query('UPDATE `tasks` SET `priority` = ? WHERE `id` = ?', task, (err, result) => {
					connection.release();
					
					if(err){
						reject(err);
					}	
					
					resolve(result);
				});
			});
		});
	}
	
}

module.exports = Task;