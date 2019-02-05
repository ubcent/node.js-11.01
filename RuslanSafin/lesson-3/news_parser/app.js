const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');


(function getNews(){
    let rubLinks;
    let rubNames;

    //Забираем имена разделов и ссылки до них
    request('https://news.yandex.ru/', function (error, response, html) {

        if(!error && response.statusCode === 200){
            const $ = cheerio.load(html);
            rubLinks = $('.nav-by-rubrics__rubric a');
            rubNames = $('.nav-by-rubrics__rubric');
        }
        
        const showNews = (link) =>{
            for(let i = 0; i<link.length; i++){
                let fullLink = 'https://news.yandex.ru'+link.eq(i).attr('href');
                //Открываем новое соединение для каждого раздела
                request(fullLink, function (error, response, html) {
                    if(!error && response.statusCode === 200){
                        const $ = cheerio.load(html);
                        const allHeaders = $('.story__title');//Все заголовки новостей данного раздела
                        console.log(`\n\t\t${chalk.black.bgYellow('--| '+rubNames.eq(i).text()+' |--')}\n`)//Выводим название раздела
                        for(let i = 0; i < allHeaders.length; i++){
                            console.log(`${chalk.black.bgWhite('- '+allHeaders.eq(i).text() +' ')}`)//Выводим заголовки новостей конкретного раздела
                        }
                    }
                });
            };
        }
        showNews(rubLinks);
    });
})();