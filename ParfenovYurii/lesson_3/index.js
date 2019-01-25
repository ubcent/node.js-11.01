const request = require('request');
const cheerio = require('cheerio');
const ansi = require('ansi');
const moment = require('moment');

var now = moment().add();
const cursor = ansi(process.stdout);


request('https://ria.ru/', (err, response, output) => {
    if (!err && response.statusCode === 200) {
        const $ = cheerio.load(output);
        cursor.red();
        console.log('Список Главных Новостей ' + now.format('dddd, MMMM DD YYYY'));
        cursor.reset();
        let length = $('.cell-list__item-title').length;
        for (let i = 0; i <= length; i++) {
            let text = $('.cell-list__item-title').eq(i).text();
            console.log(`${i+1}) `+text);
           
        }
        
    }
})



