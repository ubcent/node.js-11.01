const request = require('request');
const cheerio = require('cheerio');

request('http://lenta.ru/rss', function (error, response, html) {
	if (!error) {
		var $ = cheerio.load(html);
		console.log('Новости');
		$('item').each(function (i, element) {
			var titles = $(element).find('title');
			console.log(titles.text());
		});
	}
});
