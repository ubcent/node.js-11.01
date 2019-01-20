const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin, // ввод из стандартного потока
    output: process.stdout // вывод в стандартный поток
});


function coinFlip() {
    return (Math.floor(Math.random() * 2) === 0) ? "орел" : "решка";
}

function game() {
    rl.question('Введите орел или решка.\nExit или выход для выхода из игры\n:', function (answer) {
        let coint = coinFlip();
        if (answer === 'exit') {
            return rl.close();
        }

        if (answer === 'орел' || answer === 'Орел' || answer === 'Решка' || answer === 'решка') {
            if (answer === coint) {
                console.log('Вы выйграли\n');
                rl.close();
            } else {
                console.log('Вы проиграли\n');
                rl.close();
            }
        } else {
            console.log('Вы ввели не верное значение');
        }
        game();
    })
};

game();