const express = require('express');
const Joi = require('joi');

const { User } = require('../dal');

const schema = {
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
};

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).send('User not found');
  }

  if (!user.authenticate(password)) {
    return res.status(401).send('Password does not match');
  }

  const token = user.generateToken();
  return res.json({ token, user });
});

module.exports = {
  router,
  schema
};
