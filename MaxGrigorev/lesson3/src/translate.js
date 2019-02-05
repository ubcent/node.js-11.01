const request = require('request-promise');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const keyAPI = 'trnsl.1.1.20190129T120441Z.51dd540b4682967f.7f9ee65a32b1013a4c7b4bcaa951cd831ef9c6a3'

var query = {
   method: 'GET',
   uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
   qs: {
      key: keyAPI,
      format: 'plain'
   },
   json: true
}

rl.question('Введите текст на английском: ', function (answer) {
   query.qs.lang = 'en-ru';
   query.qs.text = answer;
   request(query)
      .then(function (response) {
         console.log(`Перевод ${answer}: ` + response.text);
         rl.close();
      })
      .catch(function (err) {
         console.error('Произошла ошибка!');
         rl.close();
      })
});



