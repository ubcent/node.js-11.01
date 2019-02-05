const crypto = require('crypto');
const secret = 'hNL2vRaiDc9ceH73p5se';
const pool = require('./config');

class User {
    static getUserName(username){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err){
                    reject(err);
                }

                connection.query('SELECT * FROM `tasks_user` WHERE username = ?  LIMIT 1', username, (err, rows) => {
                    connection.release();
                    if(err){
                        reject(err);
                    }

                    resolve(rows[0]);
                });
            });
        });
    }

    static getUserId(id){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err){
                    reject(err);
                }

                connection.query('SELECT * FROM `tasks_user` WHERE id = ?  LIMIT 1', id, (err, rows) => {
                    connection.release();
                    if(err){
                        reject(err);
                    }

                    resolve(rows[0]);
                });
            });
        });
    }

    static encryptoPass(password){
        var sha256 = crypto.createHash("sha256"); 
        sha256.update(password, "utf8");
        return sha256.digest("base64"); 
    }
}

module.exports = User;