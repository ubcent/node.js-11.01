const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const path = require('path');
const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
var crypto = require('crypto');

const User = require('./models/user');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/bootstrap/css', express.static('./node_modules/bootstrap/dist/css'));

app.use(cookieSession({
    name: 'session',
    keys: ['123456'],
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
// optional (depends on authentication type)
app.use(passport.session());

passport.use(new LocalStategy(async (username, password, done) => {
  const user = await User.findOne(username);

  if(!user) {
    return done(null, false);
  }

  if(crypto.createHmac('sha1', '123456').update(password).digest('hex') === user.password) {
    // прежде чем отправлять пользователя его нужно очистить от sensitive полей
    delete user.password;
    return done(null, user);
  } 
    
  return done(null, false);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});

const authHandler = passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth',
});

app.get('/auth', (req, res) => {
  res.render('login');
});

app.post('/auth', authHandler);

const mustBeAuthenticated = (req, res, next) => {
  if(req.user) {
    return next();
  }

  res.redirect('/auth');
}

app.all('/user', mustBeAuthenticated);

app.get('/user', (req, res) => {
  // req.user;
  res.send('TODO USER PAGE');
});


app.listen(8888, () => {
	console.log("Server has been started");
});