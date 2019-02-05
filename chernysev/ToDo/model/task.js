const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
  title: { type: String, reuired: true },
  description: { type: String, reuired: true },
  timeOut: { type: String, default: new Date() },
  status: { type: Boolean, default: false }
});

module.exports = mongoose.model('task', task);