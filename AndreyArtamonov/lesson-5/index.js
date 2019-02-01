const express = require('express');
const Task = require('./models/task');
const Connection = require('./config');

const app = express();
const connection = new Connection('mongodb://localhost:27017');

connection.connect('homework-5');

class TaskList {
    static getAll() {
        return Task.find();
    }

    static async add(title, priority = 'medium') {
        const list = await Task.find();
        const id = (list.length !== 0) ? ++list[list.length - 1].id : 1;
        const newTask = new Task({id, title, priority, status: 'not started'});

        newTask.save();
    }

    static getTaskById(id) {
        return Task.find({id});
    }

    static async increasePriority(id) {
        const [task] = await this.getTaskById(id);
        const currentPriority = task.priority;
        const newPriority = (currentPriority === 'low') ? 'medium' : 'high';

        Task.updateOne({id}, {priority: newPriority}, (err, res) => {
            if (err) throw err;
        })
    }

    static async lowerPriority(id) {
        const [task] = await this.getTaskById(id);
        const currentPriority = task.priority;
        const newpriority = (currentPriority === 'high') ? 'medium' : 'low';

        Task.updateOne({id}, {priority: newPriority}, (err, res) => {
            if (err) throw err;
        })
    }

    static async startTask(id) {        
        Task.updateOne({id}, {status: 'started'}, (err, res) => {
            if (err) throw err;
        })
    }

    static async finishTask(id) {        
        Task.updateOne({id}, {status: 'finished'}, (err, res) => {
            if (err) throw err;
        })
    }

    static async isFinish(id) {
        const [task] = await this.getTaskById(id);

        return task.status === 'finished';
    }
}

app.get('/', async (req, res) => {
    const list = await TaskList.getAll();
    res.send(list);
});

app.get('/add', (req, res) => {
    const {title, priority} = req.query;

    if (title) {
        TaskList.add(title, priority);

        res.send({result: 1});
    } else {
        res.send({result: 0, message: 'field <title> are required'});
    }
})

app.get('/get-task', async (req, res) => {
    const id = req.query.id;

    if (id) {
        const [task] = await TaskList.getTaskById(id);

        res.send(task);
    } else {
        res.send({result: 0, message: 'field <id> are required'});
    }
})

app.get('/increase-priority', async (req, res) => {
    const id = req.query.id;

    if (id) {
        const isFinished = await TaskList.isFinish(id);

        if (isFinished) {
            res.send({result: 0, message: 'the task is finished'})
            return;
        }

        TaskList.increasePriority(id);

        res.send({result: 1});
    } else {
        res.send({result: 0, message: 'field <id> are required'});
    }
})

app.get('/lower-priority', async (req, res) => {
    const id = req.query.id;

    if (id) {
        const isFinished = await TaskList.isFinish(id);

        if (isFinished) {
            res.send({result: 0, message: 'the task is finished'});
            return;
        }

        TaskList.lowerPriority(id);

        res.send({result: 1});
    } else {
        res.send({result: 0, message: 'field <id> are required'});
    }
})

app.get('/start-task', async (req, res) => {
    const id = req.query.id;

    if (id) {
        const [task] = await TaskList.getTaskById(id);

        if (!task) {
            res.send({result: 0, message: 'the task is not created'});
            return;
        }

        const status = task.status;

        if (status === 'finished') {
            res.send({result: 0, message: 'the task is finished'});
            return;
        }

        TaskList.startTask(id);

        res.send({result: 1});
    } else {
        res.send({result: 0, message: 'field <id> are required'});
    }
})

app.get('/finish-task', async (req, res) => {
    const id = req.query.id;

    if (id) {
        const [task] = await TaskList.getTaskById(id);

        if (!task) {
            res.send({result: 0, message: 'the task is not created'});
            return;
        }

        TaskList.finishTask(id);

        res.send({result: 1});
    } else {
        res.send({result: 0, message: 'field <id> are required'});
    }
})

app.listen(8888, () => {
    console.log('Server has been started');
})