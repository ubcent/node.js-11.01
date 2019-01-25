const minimist = require('minimist');
const fs = require('fs');

const argv = minimist(process.argv.slice(2));
var log_file = '';

if(Object.keys(argv).length){
	if(argv["_"]){
		log_file = argv["_"][0];
	}
}

if(log_file){
	fs.access(log_file, function(error){
		if(error){
			console.log("Файл не найден!");
		}else{
			var content = fs.readFileSync(log_file, "utf8");
			
			var all = content.length;
			var wins = lose = 0;
			
			for(var i = 0; i < all; i++){
				if(content[i] == "1"){
					wins++;
				}else{
					lose++;
				}
			}
			
			console.log("Всего партий: " + all);
			console.log("Побед: " + wins);
			console.log("Поражений: " + lose);
		}
	});
}else{
	console.log("Не указан файл логов!");
}
