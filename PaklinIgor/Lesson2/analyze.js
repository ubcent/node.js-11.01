const fs = require('fs');
const colors = require('colors/safe');
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
const LOG_FILE = args.files;//'./game_log.txt';

const results = fs.readFileSync(LOG_FILE).toString().split("\n");

const winnings = results.filter(el => {
    return el === 'your win';
}).length;

const looses = results.filter(el => {
    return el === 'your loose';
}).length;

const draws = results.filter(el => {
    return el === 'draw';
}).length;

const games = winnings+looses+draws;

console.log('Games: '+(games));
console.log(colors.green('Wins: '+winnings));
console.log(colors.red('Looses: '+looses));
console.log(colors.grey('Draws: '+draws));
console.log(colors.yellow('Winrate: '+ (Math.round(100*winnings/games)/100)));
