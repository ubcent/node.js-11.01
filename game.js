const ansi = require('ansi');
const readline = require('readline');

const cursor = ansi(process.stdout);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fs = require('fs');

let count = 0;
let result = '';
let message = [];
fs.writeFile('gamelog.json', '', (err) => {
  if (err) throw err;
});

console.log('Введите "орел" или "решка". Для окончания игры введите "выход"');
rl.on("line", (line) => {
    count++;
    if (line === "выход") {
      fs.writeFileSync('gamelog.json', `[${message}]` ,
        (err) => {
          if (err) throw err;
        });
      getLog('./gamelog.json');
      rl.close();
    } else {
      let chance = Math.floor(Math.random() * 2) + 1;
      switch (chance) {
        case 1:
          chance = 'орел';
          break;
        case 2:
          chance = 'решка';
          break;
      }
      cursor.red().bg.grey().write(`Выпал ${chance}\n`).bg.reset().reset();
      console.log('Введите "орел" или "решка". Для окончания игры введите "выход"');

      if (line === chance) {
        result = 'win';
      } else {
        result = 'lose';
      }
      let string = JSON.stringify({
        'count': count,
        'result': result
      });
      message.push(string);


    }
  }
);

function getLog(fileName) {
  let fs = require('fs');
  let data = fs.readFileSync(fileName);
  console.log(data.toString());
  data = JSON.parse(data);
  console.log(typeof data);
  console.log(data[0].result);
  let wins = 0;
  let loses = 0;
  let winSeria = 1;
  let maxWinSeria = 1;
  let loseSeria = 1;
  let maxLoseSeria = 1;
  let played = data.length;

  for (let i = 0; i < played; i++) {
    if (data[i].result === 'win') {
      wins++
    } else {
      loses++
    }
    if (i > 0 && data[i].result === 'win' && data[i-1].result === 'win') {
      winSeria++;
      if (winSeria > maxWinSeria) {
        maxWinSeria = winSeria;
      }
    } else if (i > 0 && data[i].result === 'lose' && data[i-1].result === 'lose') {
      loseSeria++;
      if (loseSeria > maxLoseSeria) {
        maxLoseSeria = loseSeria;
      }} else {
      winSeria = 1;
      loseSeria = 1;
    }
  }

  let winRate = wins / played * 100;
  console.log(`Всего игр сыграно - ${played}.
  Из них побед - ${wins}, поражений - ${loses}. 
  Максимальная выигрышная серия - ${maxWinSeria}.
  Максимальная проигрышная серия - ${maxLoseSeria}.
  Процент побед - ${winRate}%`);
}