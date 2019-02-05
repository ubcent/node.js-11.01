const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const consolidate = require('consolidate');
const request = require('request');
const cheerio = require('cheerio');
const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;

const Task = require('./models/task');
const User = require('./models/user');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(cookieSession({
    name: 'session',
    keys: ['secret']
}));

app.use(cookieParser());
app.use('/assets', express.static('./static'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStategy(async (username, password, done) => {
        const user = await User.getUserName(username);

        if(!user.username) {
            console.log('The user is not found');
            return done(null, false);
        }

        if(User.encryptoPass(password) === user.password) {
            return done(null, {id: user.id, username: user.username});
        } 
        
        return done(null, false);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.getUserId(id);
    done(null, {id: user.id, username: user.username});
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
    if(req.session.passport.user) {
        return next();
    } 

    res.redirect('/auth');
}

app.all('/user', mustBeAuthenticated);
app.all('/user/*', mustBeAuthenticated);

app.get('/user', (req, res) => {
    res.send('TODO USER PAGE');
});

app.get('/user/settings', (req, res) => {
    res.send('TODO USER SETTING');
});

app.get('/todo', (req, res) => {
    getTodo(req, res);
});

app.post('/todo', (req, res) => {
    addTodo(req, res);
});


function getTodo(req, res) {
    const tasks = Task.getAll();

    tasks.then(
        result => {
            res.render('todo', {
                title: 'Ваши дела',
                todolist: result
            });
        },
        error => console.log(error.message)
    );
}

function addTodo(req, res) {
    const unixtime = new Date().getTime() / 1000;

    let tasks = Task.add({
        title: req.body.tit,
        descr: req.body.descr,
        datka: unixtime
    });

    tasks.then(
        result => {
            getTodo(req, res);
        },
        error => console.log(error.message)
    );
}


app.listen(8888, () => {
    console.log('Server has been started');
});
