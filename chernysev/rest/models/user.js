const mongose = require('mongoose');
const Schema = mongose.Schema;
const crypto = require('crypto');

const user = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  rules: { //тип прав
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

user.methods.encryptPass = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

user.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random + '';
    this.hashedPassword = this.encryptPass(password);
  })
  .get(function() {
    return this._plainPassword;
  })

user.methods.checkPassword = function(password) {
  return this.encryptPass(password) === this.hashedPassword;
}

module.exports = mongose.model('User', user);