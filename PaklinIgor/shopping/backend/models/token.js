const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Token = new Schema(
    {
        token: { type: String, required: true },
        user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    }
);

module.exports = mongoose.model('Token', Token);