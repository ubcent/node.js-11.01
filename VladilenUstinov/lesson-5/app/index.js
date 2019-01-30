const express = require('express');
const port = 9999;

const app = express();

const Task = require('../models/task');

app.get('/', (req, res) => {
    let tasks = Task.getAll();

    tasks.then((data) => {
        let x = '';
        data.forEach((temp) => {
            x += `ID: ${temp.id}</br> Text: ${temp.text}</br> Date: ${temp.date}</br></br>`;
        });

        res.send(`${x}`);
    });

});

app.listen(port, () => {
    console.log(`Server has been started http://localhost:${port}`);
});

