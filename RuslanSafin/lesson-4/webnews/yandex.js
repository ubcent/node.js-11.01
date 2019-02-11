const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const News = require('./news');
const router = express.Router()



router.post('/science', (req, res, next)=>{
    let allNews =[];
    request('https://news.yandex.ru/science.rss', function (error, response, html) {
        const $ = cheerio.load(html);
        const title = $('title').slice(2);//Заголовок новости
        const article = $('description').slice(1);//тело новости
        for(let i = 0; i< title.length; i++){
            allNews.push(new News('Наука и технологии', title.eq(i).text(), article.eq(i).text()));
        }
        res.clearCookie('lenta');
        res.cookie('yandex', 'science',{maxAge:60000});
        res.status(200).send(allNews)
        });

})

router.post('/sport', (req, res, next)=>{
    let allNews =[];
    request('https://news.yandex.ru/sport.rss', function (error, response, html) {
        const $ = cheerio.load(html);
        const title = $('title').slice(2);//Заголовок новости
        const article = $('description').slice(1);//тело новости
        for(let i = 0; i< title.length; i++){
            allNews.push(new News('Спорт', title.eq(i).text(), article.eq(i).text()));
        }
        res.clearCookie('lenta');
        res.cookie('yandex', 'sport',{maxAge:60000});
        res.status(200).send(allNews)
        });

})

router.post('/business', (req, res, next)=>{
    let allNews =[];
    request('https://news.yandex.ru/business.rss', function (error, response, html) {
        const $ = cheerio.load(html);
        const title = $('title').slice(2);//Заголовок новости
        const article = $('description').slice(1);//тело новости
        for(let i = 0; i< title.length; i++){
            allNews.push(new News('Бизнес', title.eq(i).text(), article.eq(i).text()));
        }
        res.clearCookie('lenta');
        res.cookie('yandex', 'business',{maxAge:60000});
        res.status(200).send(allNews)
        });

})

router.post('/main', (req, res, next)=>{
    console.log(req.body)
    let allNews =[];
    request('https://news.yandex.ru/index.rss', function (error, response, html) {
        const $ = cheerio.load(html);
        const title = $('title').slice(2);//Заголовок новости
        const article = $('description').slice(1);//тело новости
        for(let i = 0; i< title.length; i++){
            allNews.push(new News('Главное', title.eq(i).text(), article.eq(i).text()));
        }
        res.clearCookie('lenta');
        res.cookie('yandex', 'main',{maxAge:60000});
        res.status(200).send(allNews)
        });

})

module.exports = router;