const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const Task = require('./models/task');
const User = require('./models/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

function validateToken(req, res, next) {
    if(req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ');
        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) {
                return res.status(403).json({ message: 'Wrong token' });    
            }

            req.user = decoded;
            next();
        });
    } else {
        res.status(403).json({ message: 'Token is empty' });
    }
}

app.use('/task', validateToken);
 

app.get('/task', (req, res) => {
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

app.get('/task/:id', (req, res) => {
    const tasks = Task.getById(req.params.id);

    tasks.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

app.post('/task', (req, res) => {
    const { title, descr } = req.body;
    const unixtime = new Date().getTime() / 1000;
    const tasks = Task.add({title: title, descr: descr, date: unixtime});

    tasks.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

app.put('/task/:id', (req, res) => {
    const { title, descr } = req.body;
    const unixtime = new Date().getTime() / 1000;
    const tasks = Task.update([title, descr, unixtime, req.params.id]);

    tasks.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

app.delete('/task/:id', (req, res) => {
    const tasks = Task.remove(req.params.id);

    tasks.then(
        result => {
            res.json(result);
        },
        error => {
            res.json(error.message);
        }
    );
});

// app.patch('/users/:id', (req, res) => {}); // partial update

app.post('/auth', (req, res) => {
    const { username, password } = req.body;

    const user = User.getUserName(username);

    user.then(
        result => {
            if(result.username && User.encryptoPass(password) === result.password) {
                delete result.password;

                const token = jwt.sign({data: result}, 'secret', { expiresIn: '1h' });
                
                res.json({
                    token,
                });
            } else {
                res.status(403).json({ message: 'Wrong credentials' });
            }
        },
        error => {
            res.json(error.message);
        }
    );
});


app.listen(8888, () => {
    console.log('Server has been started');
});
