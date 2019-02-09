const express = require('express');

const auth = require('./auth');
const user = require('./user');
const blog = require('./blog');
const { validateParams } = require('../middleware/validators');

const router = express.Router();

router.use('/auth', validateParams(auth.schema), auth.router);
router.use('/user', validateParams(user.schema), user.router);
router.use('/blog', validateParams(blog.schema), blog.router);

module.exports = { router };
