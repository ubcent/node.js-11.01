const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const readline = require('readline');
const fs = require('fs');

let logFile = "";

const game = {
  player: {
    score: 0
  },
  dealer: {
    score: 0
  },
  results: {
    total: 0,
    win: 0,
    lose: 0,
    draw: 0
  },
  init: function () {
    this.player.score = 0;
    this.dealer.score = this.getRandomCard() + this.getRandomCard();
  },
  showStats: function () {
    console.log(`Статистика игры:
  всего игр: ${this.results.total}
  выиграно: ${this.results.win}
  ничьих: ${this.results.draw}
  проиграно: ${this.results.lose}`)
  },
  getRandomCard: function () {
    return Math.floor(Math.random() * 10) + 2;
  },
  validateScore: function () {
    if (this.player.score === 21) {
      this.win();
      this.retry();
    } else if (this.player.score > 21) {
      this.lose();
      this.retry();
    } else {
      return true;
    }
  },
  end: function () {
    if (this.player.score > this.dealer.score) {
      this.win();
    } else if (this.player.score === this.dealer.score) {
      this.draw();
    } else {
      this.lose();
    }
    this.retry();
  },
  retry: function () {
    this.logToFile();
    rl.question("Еще раз? ", (text) => {
      if (text.trim().toLowerCase() === "да" || text.trim().toLowerCase() === "д") {
        this.init();
        console.log(chalk.blue(">>>Новая игра<<<"));
        rl.question("Ваш выбор: ", (text) => {
          userSays(text)
        });
      } else {
        this.showStats();
        rl.close();
      }
    })
  },
  win: function () {
    this.results.win += 1;
    this.results.total += 1;
    if (this.player.score === 21) {
      console.log(chalk.bgGreen.white(`Вы набрали 21 очко и выиграли!`))
    } else {
      console.log(chalk.bgGreen.white(`У дилера ${this.dealer.score}. Вы выиграли!`))
    }
  },
  lose: function () {
    this.results.lose += 1;
    this.results.total += 1;
    if (this.player.score > 21) {
      console.log(chalk.bgRed.white(`Вы набрали больше 21 очка и проиграли!`))
    } else {
      console.log(chalk.bgRed.white(`У дилера ${this.dealer.score}. Вы проиграли!`))
    }
  },
  draw: function () {
    this.results.draw += 1;
    this.results.total += 1;
    console.log(chalk.bgGray.white(`У дилера ${this.dealer.score}. Ничья`))
  },
  logToFile: function () {
    if (logFile) {
      fs.writeFile(logFile, JSON.stringify(this.results), () => {});
    }
  }
};

if (argv._[0]) {
  fs.exists(argv._[0], (exist) => {
    if (exist) {
      logFile = argv._[0];
    }
    fs.readFile(logFile, function (err, data) {
        if (err) {
          console.error(err);
        } else {
          if (data.toString()) {
            const res = JSON.parse(data.toString());
            game.results.total = res.total || 0;
            game.results.win = res.win || 0;
            game.results.lose = res.lose || 0;
            game.results.draw = res.draw || 0;
          }
        }
      }
    );
  })
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`==================== Блэкджэк ====================
Правила:
У дилера 2 карты. Каждая карта дает от 2 до 11 очков. Игрок получает карты по одной и может остановить игру, когда пожелает.
Набрав больше 21 очка - игрок проигрывает. Игрок побеждает, если наберет 21 очко или больше дилера.

Команды: 
карта - получить карту
стоп - сравнить результат
стат - показать статистику
выход - выход

Ваш выбор: `, (text) => {
  game.init();
  userSays(text);
});

rl.on('line', (text) => {
  userSays(text);
});

function userSays(word) {
  switch (word.trim().toLowerCase()) {
    case "стат":
      game.showStats();
      break;
    case "выход":
      game.showStats();
      rl.close();
      break;
    case "карта":
      const card = game.getRandomCard();
      console.log("Вы получили ", card);
      game.player.score += card;
      console.log(chalk.bgWhite.black(`Сейчас у вас ${game.player.score}`));
      if (game.validateScore()) {
        rl.question("Ваш выбор: ", (text) => {
          userSays(text)
        })
      }
      break;
    case "стоп":
      game.end();
      break;
    default:
      console.log(chalk.bgYellow.black("Неизвестная команда, повторите ввод"));
  }
}