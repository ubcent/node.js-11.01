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
  const tasks = await Task.find();
  res.json(task);
});
//возвращает все невыполненные таски
app.get('/tasks/false', (req, res) => {
  Task.find({ status: false }, (err, tasks) => {
    if (err) {
      res.sendStatus(503);
    }
    res.json(tasks);
  });
});
//возвращает только выполненные таски
app.get('/tasks/true', (req, res) => {
  Task.find({ status: true }, (err, tasks) => {
    if (err) {
      res.sendStatus(503);
    }
    res.json(tasks);
  });
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
     console.log(task.desctiption);
     Task.find({ _id: req.params.id }, (err, task) => {
       res.status(200).json(task);
     })
   });
});

//Выполнение задачи
app.patch('/tasks/:id', (req, res) => {
  const task = Task.find({ _id: req.params.id });
  task.updateOne( { _id: req.params.id }, { status: true }, (err, raw) => {
    if (err) {
      res.sendStatus(503);
    }
    //тут костылек чтобы вернуть обновленный таск
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