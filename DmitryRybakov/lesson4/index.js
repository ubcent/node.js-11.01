const express = require("express");
const consolidate = require('consolidate');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');
const cookieParser = require('cookie-parser');

const app = express();


app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/assets', express.static('./static'));
app.use('/node_modules/bootstrap/dist/css', express.static('./node_modules/bootstrap/dist/css'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.get('/news', (req, res) => {
	var cnt = 0;
	if (req.cookies.news_cnt === undefined){
		if(req.query.count){
			var cnt = req.query.count;
		}
	}else{
		var cnt = req.cookies.news_cnt;
	}
	
	show_news(req, res, cnt);
});

app.post('/news', (req, res) => {
	if(req.body.news_cnt){
		show_news(req, res, req.body.news_cnt);
	}else{
		show_news(req, res);
	}
});


app.listen(8888, () => {
	console.log("Server has been started");
});


function show_news(req, res, cnt = 0){
	request('https://lenta.ru/rubrics/economics/', (err, response, html) => {
		if(!err && response.statusCode === 200){
			const $ = cheerio.load(html);
			var news = [];
			var counter = 0;
			var max = (cnt == 0) ? 9999 : cnt;
			
			$('.js-rubric__sidebars .b-yellow-box__wrap .item').each(function(i, elem) {
				counter++;
				if(counter <= max){
					let link = $(this).find("a").attr("href");
					let title = $(this).find("a").text();
					let time = $(this).find("time").attr("title");
					title = title.substr(5);
					
					news.push({"link": link, "title": title, "time": time});
				}
			});
			
			if(!cnt) cnt = '';
			res.cookie('news_cnt',cnt, { maxAge: 900000, httpOnly: true });
			
			res.render('news', {'news': news, 'cnt': cnt});
		}
	})
}