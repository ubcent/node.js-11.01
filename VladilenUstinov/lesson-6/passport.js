const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
// optional (depends on authentication type)
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({username}).lean();

    if(!user) {
        return done(null, false);
    }

    if(User.encryptPass(password) === user.password) {
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
    const user = await User.findById(id);

    done(null, user);
});

const authHandler = passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth',
});

app.get('/auth', (req, res) => {
    res.render('loginForm');
});

app.post('/auth', authHandler);

const mustBeAuthenticated = (req, res, next) => {
    if(req.user) {
        return next();
    }

    res.redirect('/auth');
};

app.all('/user', mustBeAuthenticated);
app.all('/user/*', mustBeAuthenticated);

app.get('/user', (req, res) => {
    // req.user;
    res.send('TODO USER PAGE');
});

app.get('/user/settings', (req, res) => {
    res.send('TODO USER SETTING');
});

app.listen(8888);
