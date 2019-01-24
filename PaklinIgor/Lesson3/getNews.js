const request = require('request');
const cheerio = require('cheerio');

request.get('https://www.e1.ru/', {followAllRedirects: true}, (err, res, html) => {
    if (!err && res.statusCode == 200) {
        // console.log(html);
        const $ = cheerio.load(html);
        $('.e1-article-section__content').find('.e1-article').each((i,element) => {
            const head = $(element).find('.e1-article__tit').eq(0).text();
            const text = $(element).find('.e1-article__text').eq(0).text();
            console.log({
                header: head,
                body: text
            });
        });
    }
});