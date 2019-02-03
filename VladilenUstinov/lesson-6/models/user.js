const pool = require('../config/db');

class User {
    static findUser(user) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query('SELECT * FROM users WHERE user = ?', user, (err, rows) => {
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

                connection.query('SELECT * FROM users WHERE id = ?', id, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                    connection.release();
                });
            });
        });
    }
}

module.exports = User;