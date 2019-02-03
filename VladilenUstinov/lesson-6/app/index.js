const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const port = 9999;
const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views'));

app.use(cookieParser());
app.use('/assets', express.static('./static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());


const User = require('../models/user');
const Task = require('../models/task');

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findUser(username);

    if (user === null || user === undefined || user.length === 0) {
        console.log('Пользователь не найден');
        return done(null, false);
    } else {
        if (user[0].password === password) {
            console.log(`Пользователь найден id # ${user[0].id}`);
            return done(null, {user_id: user[0].id });
        } else {
            return done(null, false);
        }
    }
}));

passport.serializeUser((id, done) => {
    console.log(id);
    done(null, id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findId(id);
    // console.log(user[0]);
    done(null, user[0]);
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
    console.log(req.user);
    if (req.user) {
        console.log('попал');
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


app.get('/', (req, res) => {
    const tasks = Task.getAll();
    tasks.then((data) => {
        res.render('todo', {tasks: data});
    });
});

app.post('/add', (req, res) => {
    Task.add(req.body.task);
    res.redirect('/');
});

app.get('/remove/:id', (req, res) => {
    Task.remove(req.params.id);
    res.redirect('/');
});

app.get('/complete/:id', (req, res) => {
    Task.complete(req.params.id);
    res.redirect('/');
});

app.get('/task/:id', (req, res) => {
    const task = Task.getById(req.params.id);
    task.then((data) => {
        res.render('task', {task: data});
    });
});

let taskId = 0;

app.get('/update/:id', (req, res) => {
    const task = Task.getById(req.params.id);
    taskId = req.params.id;
    task.then((data) => {
        res.render('update', {textTask: data[0]});
    });
});

app.post('/update', (req, res) => {
    Task.update(req.body.task, taskId);
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Server has been started http://localhost:${port}`);
});

