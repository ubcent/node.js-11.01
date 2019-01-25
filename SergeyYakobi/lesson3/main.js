const request = require('request');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start(){
    console.log('\n\nДоступные команды:\n"news" - показать новости\n"translate" - для перевода\n"exit" - для выхода');
}

start();

request('https://www.newsmax.com/us/', function (error, response, html) {
if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var newsmax = '';
    $('.article_link').each(function(i, element){
        newsmax += '------------------------------------\n' + $(this).find('a').text() + '\n\n' + $(this).find('#copy_small').text() + '\n------------------------------------\n\n';
    });

    rl.on('line', function (input) {
        if(input === 'news'){
            console.log(newsmax);
            start();
        }

        if(input === 'translate'){
            request('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190125T080944Z.b855e7bbeb7f7b8f.de091af810f98f207a19af864be8dc19a703d31e&format=html&lang=en-ru&text=' + newsmax, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var answer = JSON.parse(body);
                    console.log(answer.text[0]);
                    start();
                }
            });
        }

        if(input === 'exit'){
            this.close();
        }
    });
}
});
