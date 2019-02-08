const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.json(req.user);
})

module.exports = router;