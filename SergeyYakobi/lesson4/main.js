const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const consolidate = require('consolidate');
const request = require('request');
const cheerio = require('cheerio');



const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/assets', express.static('./static'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.get('/news', (req, res) => {
    let search = '';

    if (req.cookies.search !== undefined){
        search = req.cookies.search;
    }

    if(req.query.search){
        search = req.query.search;
    }

    getNews(req, res, search);
});


app.post('/news', (req, res) => {
    let search = '';

    if(req.body.search){
        search = req.body.search;
    }

    getNews(req, res, search);
});




function getNews(req, res, search = ''){
    request('https://www.newsmax.com/us/', function (error, response, html) {
        if (!error && response.statusCode == 200) {

            const $ = cheerio.load(html);
            const newsmax = [];

            $('.article_link').each(function(i, element){
                if(search === ''){
                    newsmax.push({title: $(this).find('a').text(), descr: $(this).find('#copy_small').text()});
                } else {
                    if ($(this).find('a').text().indexOf(search) !== -1) {
                        newsmax.push({title: $(this).find('a').text(), descr: $(this).find('#copy_small').text()});
                    }
                }
                
            });

            if(search !== ''){
                res.cookie('search', search, { httpOnly: true });
            }
            
            res.render('news', {
                title: 'American news',
                newsmax: newsmax,
                search: search
            });
        }
    });
}



app.listen(8888, () => {
  console.log('Server has been started');
});
