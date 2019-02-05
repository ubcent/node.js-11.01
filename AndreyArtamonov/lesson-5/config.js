const mongoose = require('mongoose');

class Connection {
    constructor(url) {
        this.url = url;
    }
    connect(dbName) {
        mongoose.connect(`${this.url}/${dbName}`, {
            useNewUrlParser: true
        });
    }
}

module.exports = Connection;