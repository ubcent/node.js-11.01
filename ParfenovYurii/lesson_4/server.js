const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const path = require('path');
const cheerio = require('cheerio');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.get('/', (req, res) => {
    getNews(req, res);
});

app.post('/', (req, res) => {
    getNews(req, res);
});

function getNews(req,res) {
    request('https://ria.ru/', (err, response, output) => {
    if (!err && response.statusCode === 200) {
        const $ = cheerio.load(output);
        var arr = [];
        let length = $('.cell-list__item-title').length;
        for (let i = 0; i < length; i++) {
            var text = $('.cell-list__item-title').eq(i).text();
            arr.push(text);
           
        }
        //console.log(arr);
        res.render('news', {
            'title' : 'Новости',
            'text': arr,
            },
        )
    }
})
}

app.listen(8888, (err) => {
    if (err) {
        throw err;
    }
    console.log('Server working');
})

