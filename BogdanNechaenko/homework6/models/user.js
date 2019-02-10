const crypto = require('crypto');
const mysql = require('mysql');
const config = require('../config');

class User {
	constructor(username, password, id) {
		this._id = id;
    	this.username = username;
    	this.password = password;
  	}

  	static findOne(username){
  		return new Promise((resolve, reject) => {
			config.getConnection((err, connection) => {
				if(err){
					reject(err);
				}

				connection.query('SELECT * FROM `users` WHERE `username` = ? LIMIT 1', username, (err, rows) => {
					connection.release();

					if(err){
						reject(err);
					}	
					resolve(rows);
				});
			});
		});
  	}

  	static findById(userid){
  		return new Promise((resolve, reject) => {
			config.getConnection((err, connection) => {
				if(err){
					reject(err);
				}

				connection.query('SELECT * FROM `users` WHERE `_id` = ? LIMIT 1', userid, (err, rows) => {
					connection.release();

					if(err){
						reject(err);
					}	
					resolve(rows);
				});
			});
		});
  	}

  	static encryptPass(password){
  		var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
		var mystr = mykey.update(password, 'utf8', 'hex')
		mystr += mykey.final('hex');
		return mystr;
  	}

  	static checkPass(user, password) {
  		if(user.password === User.encryptPass(password)){
  			return true;
  		}
  		else return false;
  	}
}

module.exports = User;