const request = require('request');
const minimist = require('minimist');

const arguments = minimist(process.argv.slice(2));

if (arguments._.length) {
    const input = arguments._.join(' ');

    const key = 'trnsl.1.1.20190123T085523Z.ced00e7cd330282c.c45f1efdd02077930b913240bb99039f19f6ba01';

    request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&lang=ru-en&text=${encodeURI(input)}`, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(response.body).text.join(' '));
        }
    });
} else {
    console.log('Usage: node translate.js <word>');
}