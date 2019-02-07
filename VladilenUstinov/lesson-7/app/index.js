const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const port = 9999;
const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views'));

app.use(cookieSession({
    name: 'session',
    keys: ['secret']
}));

app.use(cookieParser());
app.use('/assets', express.static('./static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const User = require('../models/user');
const Task = require('../models/task');

function validateToken(req, res, next) {
    if (req.headers.authorization) {
        const [, token] = req.headers.authorization.split(' ');
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) return res.status(403).json({message: 'Wrong token'});

            req.user = decoded;
            next();
        });
    } else {
        res.status(403).json({message: 'Token is empty'});
    }
}

app.use('/users', validateToken);

app.get('/users', (req, res) => {
    res.json(req.user);
});

app.post('/auth', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findUser(username);

    if (user === null || user === undefined || user.length === 0) {
        console.log(`Пользователь ${username} не найден`);
        res.redirect('/auth');
    } else {
        if (User.encryptPass(password) === user[0].password) {
            console.log(`Пользователь найден id # ${user[0].id}`);
            const data = {
                id: user[0].id,
                user: user[0].user,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].email
            };

            const token = jwt.sign(data, 'secret', {expiresIn: '1h'});
            res.session.token = token;
            res.json({
                token,
            });
        } else {
            res.status(403).json({message: 'Wrong credentials'});
        }
    }
});

app.get('/auth', (req, res) => {
    res.render('loginForm');
});

app.get('/user', (req, res) => {
    res.render('user', req.user);
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
    Task.add(req.body.task, req.user.id);
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

