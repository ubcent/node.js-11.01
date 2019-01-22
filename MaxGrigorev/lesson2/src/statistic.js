var argc = require('minimist')(process.argv.slice(2));
var fs = require('fs');

var wins = 0;

if (!argc.file) {
    rl.write('\tВведи команду\tnode statistic.js [--file] [LogFile]\n');
    rl.close();
}
else {
    if (!fs.existsSync(argc.file)) {
        console.log('Не могу открыть файл: ', argc.file);
        process.exit();
    }

    var logs = fs.readFileSync(argc.file).toString().slice(0, -1).split(',');
    for (var j = 0; j < logs.length; j++) {
        wins += +logs[j]
    }

    console.log(`\n\tВсего игр ${logs.length}.\n\tПобед ${wins}.\n\tПроигрышей ${logs.length - wins}.\n\t%${(100 * wins / (logs.length)).toFixed(2)}.`);
}
