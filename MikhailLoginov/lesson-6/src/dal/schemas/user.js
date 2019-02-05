const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const util = require('util');

const { HabitSchema } = require('./habit');

require('dotenv').config();

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  habits: [HabitSchema]
});

const getHash = util.promisify(bcrypt.hash);

async function hashifyPassword(next) {
  const user = this;

  if (!user.password) {
    return;
  }

  try {
    const hash = await getHash(user.password, null, null);
    user.password = hash;
    next();
  } catch (e) {
    next(e);
  }
}

UserSchema.pre('save', hashifyPassword);
UserSchema.pre('update', hashifyPassword);

UserSchema.method({
  /**
   * Authenticate - check if the passwords are the same
   * @public
   * @param {String} password
   * @return {Boolean} passwords match
   */
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },
  /**
   * Generates a JSON Web token used for route authentication
   * @public
   * @return {String} signed JSON web token
   */
  generateToken() {
    /* eslint-disable no-underscore-dangle */
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET);
  },

  decodeToken(token) {
    return jwt.decode(token, { complete: true });
  }
});

module.exports = { UserSchema };
