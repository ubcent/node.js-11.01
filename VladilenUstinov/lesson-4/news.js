const path = require('path');

const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const consolidate = require('consolidate');
const url = require('url');
let urlQuery;

let obj = JSON.parse(fs.readFileSync('news/sport.json', 'utf8'));

const app = express();
const port = 9999;

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('news', path.resolve(__dirname, 'views'));

function sendRequest(url, selector, category) {
    let allNews = [];
    request(url, (err, res, html) => {
        if (err) console.log(`Не удалось получить страницу из за следующей ошибки:  ${err}`);

        const $ = cheerio.load(html);
        // собираем необъодимые данные
        $(selector).each(function () {
            let news = {category};
            news.time = $(this).find('.story__date').text().split('\n')[1];
            news.title = $(this).find('.story__title').text();
            news.description = $(this).find('.story__text').text();
            allNews.push(news);
        });
        // Записываем в json
        fs.writeFile(`news/${category}.json`, JSON.stringify(allNews), function (err) {
            if (err) {
                throw err;
            }
        });

    });
}

app.use('/assets', express.static('./static'));

app.use(bodyParser.json());

const urlYandex = {
    'sport': ['https://news.yandex.ru/sport.html?from=rubric', '.story'],
    'business': ['https://news.yandex.ru/business.html?from=rubric', '.story'],
    'politic': ['https://news.yandex.ru/politics.html?from=rubric', '.story']
};

app.use((req, res, next) => {
    urlQuery = url.parse(req.url, true).query;
    next();
});

app.get('/', (req, res) => {
    sendRequest(urlYandex['sport'][0], urlYandex['sport'][1], 'sport');
    res.render('news', obj);
});

app.get('/news-list', (req, res) => {
    obj = JSON.parse(fs.readFileSync(`news/${urlQuery.resource}.json`, 'utf8'));
    sendRequest(urlYandex[urlQuery.resource][0], urlYandex[urlQuery.resource][1], urlQuery.resource);
    res.render('news', obj);
    // res.render('news', obj)
});

app.listen(port, () => {
    console.log(`Server has been started http://localhost:${port}`);
});


