const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const shoppingRoutes = require('./routes/shoppingRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

//Соединение с БД
mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('',async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader || authHeader.split(' ')[0].toLowerCase() !== "bearer") {
            return res.status(403).send({ message: 'No valid token' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).send({ message: 'No valid token' });
        }
        const decodedToken = jwt.verify(token, 'mySecretKey');
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(403).send({ message: 'No valid token' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).send({ message: 'No valid token' });
    }
});
app.use('/api/shopping', shoppingRoutes);

app.use((error, req, res, next) => {
    const { statusCode: status, message, data } = error;
    res.status(status).json({ message, data });
});

app.listen(8888, () => {
    console.log('server started at 8888 port');
});
