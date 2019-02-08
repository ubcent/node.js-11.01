const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/', (req, res) => {
  res.send('General');
});

router.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.json(404, { message: 'User not found' });
      }
      if (user.checkPassword(password)) {
        user = user.toObject();
        delete(user.hashedPassword);
        delete(user.salt);
        const token = jwt.sign(user, 'secret', {
          expiresIn: '10s'
        });
        res.json({
          token
        })
      } else {
        res.json(403, {
          message: 'Wrong credantials'
        })
      }
    });
  } else {
    res.json(400, { message: "Bad request" });
  }
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = new User({
      username,
      password,
    });
    user.save((err, user) => {
      if (err) {
        res.json(403,{
          message: err.message,
        })
      }
      user = user.toObject();
      delete(user.hashedPassword)
      delete(user.salt)
      user.token = jwt.sign(user, 'secret', {
        expiresIn: '10s'
      });
      res.json(201, user);
    })
  } else {
    res.json(400, { message: "Bad request" });
  }
  
})

module.exports = router;