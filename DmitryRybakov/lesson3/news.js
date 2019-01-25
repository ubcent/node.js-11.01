const request = require('request');
const cheerio = require('cheerio');

request('https://lenta.ru/rubrics/economics/', (err, response, html) => {
	if(!err && response.statusCode === 200){
		const $ = cheerio.load(html);
		var news = [];
		
		$('.js-rubric__sidebars .b-yellow-box__wrap .item').each(function(i, elem) {
			let link = $(this).find("a").attr("href");
			let title = $(this).find("a").text();
			let time = $(this).find("time").attr("title");
			title = title.substr(5);
			
			news.push([link, title, time]);
		});
		
		console.log(news);
	}
})

