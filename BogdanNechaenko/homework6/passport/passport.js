const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use('local', new LocalStategy(async (username, password, done) => {
  let user = await User.findOne(username);
  let parsedstring = JSON.stringify(user);
  user = JSON.parse(parsedstring)[0];

  if(!user) {
    return done(null, false);
    console.log('User Not Found with username '+username);
  }

<<<<<<< HEAD
  if(User.checkPass(user, password)) {
=======
  if(User.encryptPass(password) === user.password) {
>>>>>>> 2e5490a2986ce1fafb162b99345c9588281b47f9
    // прежде чем отправлять пользователя его нужно очистить от sensitive полей
    delete user.password;
    return done(null, user);
  } 
    
  return done(null, false);
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
	let parsedstring = JSON.stringify(user);
  user = JSON.parse(parsedstring)[0];
  done(null, user);
});

const authHandler = passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth',
});

module.exports = {
<<<<<<< HEAD
    passport,
    authHandler
=======
    passport: passport,
    authHandler: authHandler
>>>>>>> 2e5490a2986ce1fafb162b99345c9588281b47f9
}