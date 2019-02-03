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
                    connection.release();
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
                WHERE id = ${id}`, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                    connection.release();
                });
            });
        });
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`DELETE
                                  FROM tasks
                WHERE id = ${id}`, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                    connection.release();
                });
            });
        });
    }

    static update(text, id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`UPDATE tasks
                                  SET text = (?)
                WHERE id = ${id}`, text, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                    connection.release();
                });
            });
        });

    }

    static add(text) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query('INSERT INTO tasks (`text`) VALUES (?)', text, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                    connection.release();
                });
            });
        });
    }

    static complete(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);

                connection.query(`UPDATE tasks
                                  SET status = 'complete'
                WHERE id = ${id}`, (err, rows) => {
                    if (err) reject(err);

                    resolve(rows);
                    connection.release();
                });
            });
        });
    }
}

module.exports = Task;