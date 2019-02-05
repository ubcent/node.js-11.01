const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    country: String,
    city: String,
    university: String,
    company: String,
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
})

userSchema.statics.createHash = (password) => {
    let result = '';

    for (let i = 0; i < password.length; i++) {
        let code = password.charCodeAt(i);
        result += (i % 2 === 0) ? String.fromCharCode(++code) : String.fromCharCode(--code);
    }

    return result;
}

module.exports = mongoose.model('User', userSchema);