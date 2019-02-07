const db_pool = require("../db_pool");

class User{
	
	static findOne(email){
		if(email){
			return new Promise((resolve, reject) => {
				db_pool.getConnection((err, connection) => {
					if(err){
						reject(err);
					}
				
					connection.query("SELECT * FROM `users` WHERE `email` = ? LIMIT 1", email, (err, rows) => {
						connection.release();
						
						if(err){
							reject(err);
						}	
						
						resolve(rows[0]);
					});
				});
			});
		}
		
		return false;
	}
	
	static getAll(){
		return new Promise((resolve, reject) => {
			db_pool.getConnection((err, connection) => {
				if(err){
					reject(err);
				}
			
				connection.query("SELECT `id`, `email`, `fio` FROM `users`", (err, rows) => {
					connection.release();
					
					if(err){
						reject(err);
					}	
					
					resolve(rows);
				});
			});
		});
		
		return false;
	}
	
	static addUser(new_user){
		if(new_user){
			return new Promise((resolve, reject) => {
				db_pool.getConnection((err, connection) => {
					if(err){
						reject(err);
					}
				
					connection.query("INSERT INTO `users` SET ?", new_user, (err, result) => {
						connection.release();
						
						if(err){
							reject(err);
						}	
						
						resolve(result);
					});
				});
			});
		}
		
		return false;
	}
	
	static updateUser(new_data, id){
		if(new_data && id){
			return new Promise((resolve, reject) => {
				db_pool.getConnection((err, connection) => {
					if(err){
						reject(err);
					}
				
					connection.query("UPDATE `users` SET ? WHERE `id` = ?", [new_data, id], (err, result) => {
						connection.release();
						
						if(err){
							reject(err);
						}	
						
						resolve(result);
					});
				});
			});
		}
		
		return false;
	}
	
	static deleteUser(id){
		if(id){
			return new Promise((resolve, reject) => {
				db_pool.getConnection((err, connection) => {
					if(err){
						reject(err);
					}
				
					connection.query("DELETE FROM `users` WHERE `id` = ?", id, (err, result) => {
						connection.release();
						
						if(err){
							reject(err);
						}	
						
						resolve(result);
					});
				});
			});
		}
		
		return false;
	}
	
}

module.exports = User;