const express = require('express');
const Joi = require('joi');

const { statusCodes } = require('../constants');
const { User } = require('../dal');

const schema = {
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
};

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(statusCodes.UNAUTHORIZED).send('User not found');
  }

  if (!user.authenticate(password)) {
    return res.status(statusCodes.UNAUTHORIZED).send('Password does not match');
  }

  const token = user.generateToken();
  return res.json({ token, user });
});

module.exports = {
  router,
  schema
};
