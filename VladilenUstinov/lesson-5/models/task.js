const pool = require('../config/db');

class Task {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`SELECT *
                                  FROM tasks
                                  WHERE 1`, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                });
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`SELECT *
                                  FROM tasks
                                  WHERE id =` + id, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                });
            });
        });


    }

    static remove() {

    }

    static update() {
        return `Hi, man`;
    }

    static add() {

    }

    static complete() {

    }
}

module.exports = Task;