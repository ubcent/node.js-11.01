const mongoose = require('mongoose');

const { UserSchema } = require('./schemas/user');

module.exports = {
  User: mongoose.model('User', UserSchema)
};
