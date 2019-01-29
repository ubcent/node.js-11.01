const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    const news = [];
    const newsCount = req.body.count;

    request('https://yandex.ru/', (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);
        
            for (let i = 0; i < newsCount; i++) {
                const source = $('.news__agency-icon').eq(i).attr("title");
                const title = $('.home-link.list__item-content').eq(i).text();
        
                news.push({source, title});
            }   
        }
        res.send(news);
    });
});

app.listen(8888, () => {
    console.log('Server has been started');
});