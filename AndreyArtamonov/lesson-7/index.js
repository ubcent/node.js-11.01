const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/homework-7', {
    useNewUrlParser: true,
})

app.post('/', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username}).lean();

    if (!user) res.status(403).json({ message: 'Wrong credentials' });
  
    if(User.createHash(password) === user.password) {
        delete user.password;

        const token = jwt.sign(user, 'secret', { expiresIn: '1h' });
        res.json({
            token,
        });
    } else {
        res.status(403).json({ message: 'Wrong credentials' });
    }
})

function validateToken(req, res, next) {
    if(req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ');

        if (type !== 'Bearer') return res.status(403).json({message: 'Wrong type'});

        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) {
                return res.status(403).json({message: 'Wrong token'});
            }
            req.user = decoded;
            next();
        });
    } else {
      return res.status(403).json({ message: 'Token is empty' });
    }
}

app.use('/users/:id', validateToken);

app.post('/users/', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.find({username});

    if (user.length) return res.json({ message: 'user is already exists' })

    const users = await User.find();

    const id = ++users.length;

    const newUser = new User({
        id,
        username,
        password: User.createHash(password),
    })

    newUser.save((err, user) => {
        if (err) throw err;
        return res.json({message: 'OK'});
    })    
})  

app.get('/users/:id', (req, res) => {
    if (req.user.id != req.params.id) return res.status(403).json({message: 'No access'});

    return res.json(req.user);
})

app.patch('/users/:id', (req, res) => {
    if (req.user.id != req.params.id) return res.status(403).json({message: 'No access'});

    User.updateOne({id: req.user.id}, {$set: {...req.body, updated: Date.now()}}, (err, res) => {
        if (err) throw err;
        return res.json({message: 'OK'});
    })
})

app.delete('/users/:id', (req, res) => {
    if (req.user.id != req.params.id) return res.status(403).json({message: 'No access'});

    User.deleteOne({id: req.user.id}, (err, res) => {
        if (err) throw err;
        return res.json({message: 'OK'});
    });
})

app.listen(8888);