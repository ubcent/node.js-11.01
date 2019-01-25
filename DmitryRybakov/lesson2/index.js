const minimist = require('minimist');
const readline = require('readline');
const fs = require('fs');


const argv = minimist(process.argv.slice(2));
var log_file = '';

if(Object.keys(argv).length){
	if(argv["_"]){
		log_file = argv["_"][0];
	}
}


var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.on('line', (line) => {
	
	if(line == 'exit'){
		rl.close();
	}else if(line == 'орел' || line == 'решка'){
		var result = coinFlip();
		
		console.log("Результат: " + result);
		
		if(line == result){
			console.log("Вы выиграли!");
			
			if(log_file){
				fs.appendFileSync(log_file, 1);
			}
		}else{
			console.log("Вы проиграли");
			
			if(log_file){
				fs.appendFileSync(log_file, 0);
			}
		}
		
		consoleStartMessage();
	}else{
		console.log("Ошибка ввода!");
		consoleStartMessage();
	}
	
});

consoleStartMessage();

function consoleStartMessage(){
	console.log('');
	console.log('Введите "орел" или "решка" (exit для выхода):');
}

function coinFlip() {
	return (Math.floor(Math.random() * 2) === 0) ? "орел" : "решка";
}