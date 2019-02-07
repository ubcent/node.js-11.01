const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const [, token] = req.headers.authorization.split(' ');
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.json(403, { message: 'Bad token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.json(403, { message: 'Token is empty' })
  }
}