const request = require('request');
const cheerio = require('cheerio');
const minimist = require('minimist');

const arguments = minimist(process.argv.slice(2), {
    alias: {
        save: 'S'
    }
});

displayToConsole = (news) => {
    news.forEach((item) => {
        const {source, title} = item;

        console.log(`${source}: ${title}`);
    })
};

writeToFile = (news) => {
    const fs = require('fs');

    const logPath = 'news.json';

    fs.writeFile(logPath, JSON.stringify(news), (err) => {
        if (err) throw err;
    })
};

request('https://yandex.ru/', (error, response, html) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        const newsCount = 5;

        let news = [];
    
        for (let i = 0; i < newsCount; i++) {
            const source = $('.news__agency-icon').eq(i).attr("title");
            const title = $('.home-link.list__item-content').eq(i).text();
    
            news.push({source, title});
        }

        displayToConsole(news);

        if (arguments.save) {
            writeToFile(news);
        }
    }
});