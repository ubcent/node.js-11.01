const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('General');
});

router.post('/auth', (req, res) => {
  const { username, password } = req.body;
  const user = {
    username: 'kayn23',
    password: 'secret',
  }// здесь вытаскиваю из бызы по username

  if (user.password === password) {
    delete(user.password)
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

module.exports = router;