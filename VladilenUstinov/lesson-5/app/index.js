const path = require('path');

const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');

const port = 9999;
const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views'));

app.use('/assets', express.static('./static'));
app.use(bodyParser.urlencoded({extended: false}));

const Task = require('../models/task');

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

