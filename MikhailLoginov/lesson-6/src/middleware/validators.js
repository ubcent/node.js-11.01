const jwt = require('jsonwebtoken');
const Joi = require('joi');
const util = require('util');
const { statusCodes } = require('../constants');

const verifyToken = util.promisify(jwt.verify);

function initState(req, res, next) {
  if (!req.state) {
    req.state = {};
  }

  return next();
}

async function validateToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    return res.sendStatus(statusCodes.UNAUTHORIZED);
  }

  const token = bearerHeader.split(' ')[1];

  try {
    const authData = verifyToken(token, process.env.JWT_SECRET);
    req.authData = authData;
    return next();
  }
  catch (e) {
    return res.sendStatus(statusCodes.UNAUTHORIZED);
  }
}

function setUserId(req, res, next) {
  const { userId } = req.params;

  console.log(req.headers);

  if (!userId) {
    return res.sendStatus(400);
  }

  req.state.userId = userId;
  return next();
}

function validateParams(schema) {
  return (req, res, next) => {
    const validation = Joi.validate(req.body, schema);

    if (validation.error) {
      return res.status(statusCodes.BAD_REQUEST).send(validation.error);
    }

    return next();
  }
}

module.exports = {
  validateToken,
  setUserId,
  initState,
  validateParams
};
