const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const consolidate = require('consolidate');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/assets', express.static('./static'));

app.use((req, res, next) => {
    console.log('Middleware');
    req.blabla = 'Hello World';
    next();
    // res.redirect('/404');
});

app.use(bodyParser.json());
app.use(cors());
// app.use(cors({origin: '*.domain.com'}));


app.get('/users/:id', (req, res) => {
    res.render('user', {
        fullName: 'Vasya Pupkin',
        blocked: req.params.id % 2 === 0,
    });
    // console.log(req.blabla);
    // res.send(`Hello user, ${req.params.firstName} ${req.params.lastName}`);
    // res.send({message: 'Hello world'});
});

app.post('/users', (req, res) => {
    console.log(req.body);
    res.send('как дела?');
});

app.listen(9999, () => {
    console.log('Server has been started');
});