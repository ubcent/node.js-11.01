const request = require('request');
const appendQuery = require('append-query');
const readline = require('readline');
const chalk = require('chalk');

const baseURL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
const key = 'trnsl.1.1.20190124T211748Z.394b5687568501b1.a929e57b760e5f0fab52aa7978fa1a587f09da35';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('Англо-русский переводчик');
question();

function question() {
  rl.question(chalk.red('Введите слово: '), (text) => {
    translate(text);
  });
}

function translate(text) {
  request(appendQuery(baseURL, {key: key, text: text, lang: 'en-ru'}), function (err, response) {
    if (!err && response.statusCode === 200) {
      const rs = JSON.parse(response.body);
      console.log(chalk.blue('Перевод: ') + rs.text.join(", "));
      question();
    } else {
      console.log(err);
    }
  });
}