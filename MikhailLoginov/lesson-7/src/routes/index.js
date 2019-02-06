const express = require('express');
const auth = require('./auth');
const user = require('./user');
const info = require('./info');

const { validateParams } = require('../middleware/validators');

const router = express.Router();

router.use('/auth', validateParams(auth.schema), auth.router);
router.use('/user', validateParams(auth.schema), user.router);
router.use('/info', validateParams(auth.schema), info.router);

module.exports = {
  router
};
