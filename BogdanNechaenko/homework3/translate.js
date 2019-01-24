const request = require('request-promise');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const colors = require('colors');

var options = {
    method: 'GET',
    uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    qs: {
        key: 'trnsl.1.1.20190124T163839Z.d18e16d288141ea1.69a1c9a2d675a0a59d97ea3c49273a7911207c61',
        format: 'plain',
        options: 1
    },
    json: true
}
rl.question('Выберите направление перевода: с русского на английский - нажмите 1, с английского на русский - нажмите 2 ', function(answer) {
   if(answer == '1'){
  	 options.qs.lang = 'ru-en';
   }
   else if(answer == '2'){
  	 options.qs.lang = 'en-ru';
   }
   rl.question('Введите текст: ', function(answer) {  
	 options.qs.text = answer;
	 request(options)
     .then(function (response) {
        console.log('Перевод: ' + response.text.toString().red);
        rl.close();
     })
     .catch(function (err) {
        console.error('Произошла ошибка!');
        rl.close();
     })
   });
});



