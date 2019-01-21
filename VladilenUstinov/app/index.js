const readline = require('readline');
const fs = require('fs');
const link = 'log/game.log';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function coinFlip() {
    return (Math.floor(Math.random() * 2) === 0) ? "орел" : "решка";
}

rl.write('*** Игра "Орел и решка" ***\n');

function readLog(link) {
    fs.readFile(link, 'utf8', function (err, data) {
        if (err) {
            throw err;
            return;
        }
        let stat = data.split('\n').slice(0, -1);
        let winCount = stat.filter(item => item === 'Win').length;
        let loseCount = stat.filter(item => item === 'Loss').length;
        let winLength = 0,
            maxWinLength = 0,
            lossLength = 0,
            maxLossLength = 0;


        for (let i = 0; i < stat.length; i++) {
            if (stat[i] === 'Win') {
                winLength++;
            } else {
                if (maxWinLength < winLength) {
                    maxWinLength = winLength;
                }
                winLength = 0;
            }
            if (i === stat.length - 1 && maxWinLength < winLength) {
                maxWinLength = winLength;
            }

            if (stat[i] === 'Loss') {
                lossLength++;
            } else {
                if (maxLossLength < lossLength) {
                    maxLossLength = lossLength;
                }
                lossLength = 0;
            }
            if (i === stat.length - 1 && maxLossLength < lossLength) {
                maxLossLength = lossLength;
            }
        }

        let str = `Всего проведено ${stat.length} игр\n`;
        str += `Выиграно ${winCount}\n`;
        str += `Проиграно ${loseCount}\n`;
        str += `Соотношение ${winCount}/${loseCount}\n`;
        str += `Максимальное число побед ${maxWinLength}\n`;
        str += `Максимальное число поражений ${maxLossLength}\n\n`;
        str += `Введите Орел или Решка, exit - выход, stat - статистика:`;

        return console.log(str);
    })
}

function game() {
    console.log('Введите Орел или Решка, exit - выход, stat - статистика:');
    rl.on('line', function (answer) {
        let log;
        let coin = coinFlip();
        let x;
        x = coin === 'Орел' || coin === 'орел' ? 'Выпал' : 'Выпала';

        if (answer === 'exit') {
            return rl.close();
        }

        if (answer === 'stat') {
            return readLog(link);
        }

        if (answer === 'орел' || answer === 'Орел' || answer === 'Решка' || answer === 'решка') {
            if (answer === coin) {
                console.log(`${x} ${coin}, вы выбрали ${answer}. Поздравляем! \n`);
                log = "Win\n";
            } else {
                console.log(`${x} ${coin}, вы выбрали ${answer}. =( Попробуй еще набери npm run start\n`);
                log = "Loss\n";
            }
            fs.appendFile(link, log, function (err) {
                if (err) {
                    throw err;
                }
            });
            console.log('Введите Орел или Решка, exit - выход, stat - статистика:');
        } else {
            console.log('Вы ввели не верное значение\n');
            console.log('Введите Орел или Решка, exit - выход, stat - статистика:');
        }
    })
};

game();