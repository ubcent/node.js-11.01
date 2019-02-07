const mongoose = require('mongoose');

const { UserSchema } = require('./user');
const { BlogSchema } = require('./blog');

module.exports = {
  User: mongoose.model('User', UserSchema),
  Blog: mongoose.model('Blog', BlogSchema),
};
