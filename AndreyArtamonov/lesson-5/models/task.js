const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id: Number,
    title: String,
    priority: String,
    status: String
})

module.exports = mongoose.model('Task', taskSchema, 'list');