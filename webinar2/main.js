var fs = require('fs');
var readline = require('readline');
var ansi = require("ansi");
var cursor = ansi(process.stdout);

var rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

rl.on('line', (line) => {

  function parseInput(line) {
    if(line === "орел") line = 0;
    else
      if(line === "решка") line = 1;
      else
        if(line === 'exit') line = 'exit';
        else
          if(line === 'stat') line = 'stat';
          else line = 'error';
    return line;
  }

  function createSide() {
    var side = Math.random();
    if(side < 0.5) side = 0;
        else side = 1;
    return side;
  }

  function renderInput() {
    console.log('');
    console.log('');
    console.log('введите "орел" или "решка":');
  }

  function renderStat() {
    var fileContent = fs.readFileSync("log.txt", "utf8");
    var countGames = fileContent.length / 2;
    var countWins = 0;
    for(var i = 0; i < fileContent.length; i++) {
      if(i % 2 == 0) {
        if(fileContent[i] == fileContent[i + 1]) countWins += 1;
      }
    }
    var countLoses = countGames - countWins;
    console.log(`всего игр: ${countGames}`);
    console.log(`всего побед: ${countWins}`);
    console.log(`всего поражений: ${countLoses}`);
  }

  var input = parseInput(line);
  var generate = createSide();
  var generateStr = (generate === 0) ? 'выпал орел' : 'выпала решка';

  if(input === 'exit') rl.close();
  else
    if(input === 'error') {
      cursor.red().bg.yellow().write('ошибка ввода').bg.reset().reset();
      setTimeout(renderInput, 2000);
    }
    else
      if(input === 'stat') {
        renderStat();
      }
      else
        if(input === generate) {
          console.log(generateStr);
          cursor.red().bg.yellow().write('Вы выиграли').bg.reset().reset();
          fs.appendFileSync('log.txt', input);
          fs.appendFileSync('log.txt', generate);
          setTimeout(renderInput, 1000);
        }
        else
          if(input !== generate) {
            console.log(generateStr);
            cursor.red().bg.yellow().write('Вы проиграли').bg.reset().reset();
            fs.appendFileSync('log.txt', input);
            fs.appendFileSync('log.txt', generate);
            setTimeout(renderInput, 1000);
          };
});

console.log('введите "орел" или "решка":');
