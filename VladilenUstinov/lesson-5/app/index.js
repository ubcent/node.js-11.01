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

let urlencodedParser = bodyParser.urlencoded({extended: false})

const Task = require('../models/task');

app.get('/', (req, res) => {
    let tasks = Task.getAll();

    tasks.then((data) => {
        res.render('todo', {tasks: data});
    });
});

app.post('/add', urlencodedParser, (req, res) => {
    console.log(req.params);
});

app.get('/task/:id', (req, res) => {
    let task = Task.getById(req.params.id);
    task.then((data) => {
        res.render('task', {task: data});
    });
});

app.listen(port, () => {
    console.log(`Server has been started http://localhost:${port}`);
});

