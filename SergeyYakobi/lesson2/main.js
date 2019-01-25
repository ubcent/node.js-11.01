const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const monetka = ["Орел", "Решка"];

console.log('Введите Орел или Решка, exit - выход, stat - статистика:');


rl.on('line', function (input) {
	var log;
	if(input === 'exit'){
		// Выход
		this.close();

	} else if(input === 'stat'){
		// Статистика
		fs.readFile('stat.txt', 'utf8', function (err, data) {
            if (err) {
                throw err;
                return;
            }
		    var stat = data.split('\n').slice(0, -1);
		    var win = 0, loss = 0, maxWin = 0, maxLoss = 0;
		    let a = 0, b = 0;

		    for (var key in stat) {
		        if (stat[key] === 'Win') {
		            win++;
		            a++;
		        } else {
		            if (a >= maxWin) {
		                maxWin = a;
		            }
		            a = 0;
		        }

		        if (stat[key] === 'Loss') {
		            loss++;
		            b++;
		        } else {
		            if (b >= maxLoss) {
		                maxLoss = b;
		            }
		            b = 0;
				}
		    }

		    console.log('Проведено ' + stat.length + ' игр');
		    console.log('Выиграно ' + win);
		    console.log('Проиграно ' + loss);
		    console.log('Соотношение ' + win + '/' + loss);
		    console.log('Макс. побед ' + maxWin);
		    console.log('Макс. поражений ' + maxLoss);
		    console.log('\n\nВведите Орел или Решка:');
		});
	} else {
		// Игра
	    if((input === 'Орел') || (input === 'Решка')){

	        var side = monetka[Math.floor(Math.random() * 2)];
	        if (input === side) {
	            console.log('Вы выбрали "' + input + '", выпало "' + side + '" - вы выиграли!');
	            log = "Win\n";
	        } else {
	            console.log('Вы выбрали "' + input + '", выпало "' + side + '" - вы проиграли!');
	            log = "Loss\n";
	        }

	        fs.appendFile('stat.txt', log, function (err) {
	            if (err) {
	                throw err;
	            }
	        });
	        console.log('\n\nВведите Орел или Решка:');
	    } else {
	        console.log('\n\nВведите Орел или Решка:');
	    }	
	}

});
