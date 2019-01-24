const request = require('request');
const cheerio = require('cheerio');
const colors = require('colors');


request('http://www.eurosport.ru/', function (error, response, html){
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		var k = 0;
		console.log(colors.bgRed.white('Список последних новостей на eurosport.ru') + "\n");
		$('.storylist-latest__main-title').each(function(i, element){		
			var titles = $(this).find('a');
			console.log('Название новости: '.magenta + titles.eq(0).text().green + "\n");
			var categorycontainers = $('.storylist-latest__category-title').eq(k);
			var categories = categorycontainers.find('span');
			console.log('Категория: '.gray + categories.eq(0).text().gray + "\n");
			k = k+1;
		});		
    }
});
