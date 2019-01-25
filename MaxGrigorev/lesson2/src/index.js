var argc = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (!argc.file) {
    rl.write('\tВведи команду\tnode index.js [--file] [LogFile]\n');
    rl.close();
}
else {

    rl.write('Орел(1) или Решка(2)?\n');

    rl.on('line', function (inpt) {
        var coin = 1 + Math.round(Math.random());
        inpt = parseInt(inpt);
        if (inpt === 1 || inpt === 2) {
            if (inpt === coin) {
                console.log('Win!');
                fs.appendFile(argc.file, 1 + ',', function (err) {
                    if (err) throw 'Не могу открыть файл: ' + err;
                });
            }
            else {
                console.log('Loss');
                fs.appendFile(argc.file, 0 + ',', function (err) {
                    if (err) throw 'Не могу открыть файл: ' + err;
                });
            }

        }

    });
}
