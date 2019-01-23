const request = require('request');
const readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', (line) => {
	if(line == 'exit'){
		rl.close();
	}else if(line.length < 2){
		console.log("Введите слово длиннее одного символа!");
		consoleStartMessage();
	}else{
		request('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190123T141844Z.06fca65f95c804a1.9b3318a6a3c5fc1f6aab3f0492f7125ac03aab50&text='+line+'&lang=en-ru', (err, response, html) => {
			if(!err && response.statusCode === 200){
				let result = JSON.parse(html);
				console.log("Перевод: " + result["text"][0]);
				
				consoleStartMessage();
			}
		});
	}
});

consoleStartMessage();

function consoleStartMessage(){
	console.log('');
	console.log('Введите слово для перевода с англ. на русский (exit для выхода):');
}