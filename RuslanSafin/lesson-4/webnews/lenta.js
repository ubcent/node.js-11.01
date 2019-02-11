const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const News = require('./news');
const router = express.Router()



router.post('/science', (req, res, next)=>{
    let allNews =[];
    request('https://lenta.ru/rss/news/science.rss', function (error, response, html) {
        const $ = cheerio.load(html);
        const title = $('title').slice(2);//Заголовок новости
        const article = $('description').slice(1);//тело новости
        for(let i = 0; i< title.length; i++){
            const trimArticle =  article.eq(i).html().slice(16, -8)
            allNews.push(new News('Наука и технологии', title.eq(i).text(), trimArticle));
        }
        res.clearCookie('yandex')
        res.cookie('lenta', 'science',{maxAge:60000});
        res.status(200).send(allNews)
        });

})

router.post('/sport', (req, res, next)=>{
    let allNews =[];
    request('https://lenta.ru/rss/news/sport.rss', function (error, response, html) {
        const $ = cheerio.load(html);
        const title = $('title').slice(2);//Заголовок новости
        const article = $('description').slice(1);//тело новости
        for(let i = 0; i< title.length; i++){
            const trimArticle =  article.eq(i).html().slice(16, -8)
            allNews.push(new News('Спорт', title.eq(i).text(), trimArticle));
        }
        res.clearCookie('yandex')
        res.cookie('lenta', 'sport',{maxAge:60000});
        res.status(200).send(allNews)
        });

})

router.post('/business', (req, res, next)=>{
    let allNews =[];
    request('https://lenta.ru/rss/news/economics', function (error, response, html) {
        const $ = cheerio.load(html);
        const title = $('title').slice(2);//Заголовок новости
        const article = $('description').slice(1);//тело новости
        for(let i = 0; i< title.length; i++){
            const trimArticle =  article.eq(i).html().slice(16, -8)
            allNews.push(new News('Бизнес', title.eq(i).text(), trimArticle));
        }
        res.clearCookie('yandex')
        res.cookie('lenta', 'business',{maxAge:60000});
        res.status(200).send(allNews)
        });

})

router.post('/main', (req, res, next)=>{
    let allNews =[];
    request('https://lenta.ru/rss/top7.rss', function (error, response, html) {
        const $ = cheerio.load(html);
        const title = $('title').slice(2);//Заголовок новости
        const article = $('description').slice(1);//тело новости
        for(let i = 0; i< title.length; i++){
            const trimArticle =  article.eq(i).html().slice(16, -8)
            allNews.push(new News('Главное', title.eq(i).text(), trimArticle));
        }
        res.clearCookie('yandex')
        res.cookie('lenta', 'main',{maxAge:60000});
        res.status(200).send(allNews)
        });

})

module.exports = router;