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
        if (type !== 'Bearer') return res.status(403).json({message: 'Wrong type'});

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
            req.session.token = token;
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
    tasks.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

app.post('/add', (req, res) => {
    const { task, id } = req.body;
    const tasks = Task.add(task, id);

    tasks.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

app.get('/remove/:id', (req, res) => {
    const task = Task.remove(req.params.id);
    task.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

app.get('/complete/:id', (req, res) => {
    const task = Task.complete(req.params.id);
    task.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

app.get('/task/:id', (req, res) => {
    const task = Task.getById(req.params.id);
    task.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

let taskId = 0;

app.get('/update/:id', (req, res) => {
    const task = Task.getById(req.params.id);
    taskId = req.params.id;
    task.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

app.post('/update', (req, res) => {
    Task.update(req.body.task, taskId);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server has been started http://localhost:${port}`);
});

