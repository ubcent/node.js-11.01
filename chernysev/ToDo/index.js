const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
//создание коннекта с бд
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
});

//Подключаю модель таска
const Task = require('./model/task');

//Создаю приложение
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', () => {
  //здесь будет отдаваться само приложение
  res.send('hello');
});

app.get('/tasks', async (req, res) => {
  const task = await Task.find();
  res.json(task);
});


//Создание таска
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task.save((err) => {
    if (err) {
      res.sendStatus(503);
    }
    res.status(200).json(task);
  });
});

//зменение таска
app.put('/tasks/:id', (req, res) => {
  const task = Task.find({ _id: req.params.id });
   task.updateOne( { _id: req.params.id }, req.body, (err, raw) => {
     if (err) {
       res.sendStatus(503);
     }
     Task.find({ _id: req.params.id }, (err, task) => {
       res.status(200).json(task);
     })
   });
});

//Удаление элемента
app.delete('/tasks/:id', (req, res) => {
  Task.deleteOne( { _id: req.params.id }, (err) => {
    if (err) {
      res.sendStatus(503);
    }
    res.sendStatus(204);
  });
});

app.listen(8888, () => {
  console.log('server started on http://localhost:8888');
});