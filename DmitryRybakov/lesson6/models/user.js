const db_pool = require("../db_pool");

class User{
	
	static findOne(email){
		if(email){
			return new Promise((resolve, reject) => {
				db_pool.getConnection((err, connection) => {
					if(err){
						reject(err);
					}
				
					connection.query('SELECT * FROM `users` WHERE `email` = ? LIMIT 1', email, (err, rows) => {
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
	
	static findById(id){
		if(id){
			return new Promise((resolve, reject) => {
				db_pool.getConnection((err, connection) => {
					if(err){
						reject(err);
					}
				
					connection.query('SELECT * FROM `users` WHERE `id` = ? LIMIT 1', id, (err, rows) => {
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
	
}

module.exports = User;