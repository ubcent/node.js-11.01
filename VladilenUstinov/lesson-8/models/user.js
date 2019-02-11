const pool = require('../config/db');
const crypto = require('crypto');

class User {
    static findUser(user) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query('SELECT * FROM users WHERE user = ? LIMIT 1', user, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                    connection.release();
                });
            });
        });
    }

    static findId(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query('SELECT * FROM users WHERE id = ? LIMIT 1', id, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                    connection.release();
                });
            });
        });
    }

    static encryptPass(password) {
        let cipher = crypto.createCipher('aes-128-cbc', 'mypassword');
        let encryptedData = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
        return encryptedData;
    }
}

module.exports = User;