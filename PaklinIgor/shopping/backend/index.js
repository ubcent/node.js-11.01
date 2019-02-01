const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const shoppingRoutes = require('./routes/shopping');
const bodyParser = require('body-parser');

//Соединение с БД
mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser: true});

app.use(bodyParser.json());
app.use(cors());
app.use('/api/shopping', shoppingRoutes);

app.use('',(error,req,res,next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

app.listen(8888, () => {
    console.log('server started at 8888 port');
});
