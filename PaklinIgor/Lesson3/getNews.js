const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/news',(req,res,next)=> {
    const news = [];
    request.get('https://www.e1.ru/', {followAllRedirects: true}, (err, response, html) => {
        if (!err && response.statusCode == 200) {
            // console.log(html);
            const $ = cheerio.load(html);
            $('.e1-article-section__content').find('.e1-article').each((i,element) => {
                const head = $(element).find('.e1-article__tit').eq(0).text();
                const text = $(element).find('.e1-article__text').eq(0).text();
                news.push({
                    header: head,
                    body: text
                });
            });
        }
        res.status(200).send(news);
    });
});

app.use('',(req,res,next) => {
    res.status(404).send({message: 'wrong path'});
});

app.listen(8888, () => {
    console.log('server started at 8888 port');
});