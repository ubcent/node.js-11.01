const readline = require('readline');
const fs = require('fs');
const link = 'log/game.log';

const rl = readline.createInterface({
    input: process.stdin, // ввод из стандартного потока
    output: process.stdout // вывод в стандартный поток
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
        let win = 0, loss = 0, maxWin = 0, maxLoss = 0;
        let a = 0, b = 0;
        for (let key of stat) {
            (key === 'Win') ? win++ && a++ : (a >= maxWin) ? maxWin = a : a = 0;
            (key === 'Loos') ? loss++ && b++ : (b >= maxLoss) ? maxLoss = b : b = 0;
        }

        let str = `Всего проведено ${stat.length} игр\n`;
        str += `Выиграно ${win}\n`;
        str += `Проиграно ${loss}\n`;
        str += `Соотношение ${win}/${loss}\n`;
        str += `Максимальное число побед ${maxWin}\n`;
        str += `Максимальное число поражений ${maxLoss}\n\n`;
        str += `Введите Орел или Решка, exit - выход, stat - статистика:`;

        return console.log(str);
    })
}

function game() {
    console.log('Введите Орел или Решка, exit - выход, stat - статистика:');
    rl.on('line', function (answer) {
        let log;
        let coint = coinFlip();
        let x;
        if (coint === 'Орел' || coint === 'орел') {
            x = 'Выпал';
        } else {
            x = 'Выпала';
        }

        if (answer === 'exit') {
            return rl.close();
        }

        if (answer === 'stat') {
            return readLog(link);
        }

        if (answer === 'орел' || answer === 'Орел' || answer === 'Решка' || answer === 'решка') {
            if (answer === coint) {
                console.log(`${x} ${coint}, вы выбрали ${answer}. Поздравляем! \n`);
                log = "Win\n";
            } else {
                console.log(`${x} ${coint}, вы выбрали ${answer}. =( Попробуй еще набери npm run start\n`);
                log = "Loos\n";
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