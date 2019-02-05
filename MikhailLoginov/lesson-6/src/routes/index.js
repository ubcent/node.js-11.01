const express = require('express');
const auth = require('./auth');

const { validateParams } = require('../middleware/validators');

const router = express.Router();

router.use('/auth', validateParams(auth.schema), auth.router);

module.exports = {
  router
};
