const readline = require('readline');
const fs = require('fs');
const colors = require('colors');

const pathToLogs = require('./config');

const logAnalyzer = function(path) {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(path),
  });

  const statistic = {
    games: 0,
    loses: 0,
    wins: 0,
    losesInARow: 0,
    winsInARow: 0,
  };
  let winStreak = false,
    winsInARow = 0,
    loseStreak = false,
    losesInARow = 0;

  lineReader.on('line', line => {
    statistic.games++;
    if (line.indexOf('lost') > -1) {
      losesInARow = loseStreak ? ++losesInARow : 1;
      loseStreak = true;
      winStreak = false;
      winsInARow = 0;

      if (statistic.losesInARow < losesInARow) {
        statistic.losesInARow = losesInARow;
      }
      statistic.loses++;
    }

    if (line.indexOf('won') > -1) {
      winsInARow = winStreak ? ++winsInARow : 1;
      winStreak = true;
      loseStreak = false;
      losesInARow = 0;

      if (statistic.winsInARow < winsInARow) {
        statistic.winsInARow = winsInARow;
      }
      statistic.wins++;
    }
  });

  lineReader.on('close', () => {
    console.clear();
    console.log('-----GAME STATISTIC-----'.red);
    console.log('Total games played: '.green, statistic.games);
    console.log('Total loses: '.green, statistic.loses);
    console.log('Total wins:'.green, statistic.wins);
    console.log('Win ratio:'.green, (statistic.wins / statistic.loses).toFixed(2));
    console.log('The best win streak: '.green, statistic.winsInARow);
    console.log('The worse lose streak: '.green, statistic.losesInARow);
  });
};

logAnalyzer(pathToLogs);
