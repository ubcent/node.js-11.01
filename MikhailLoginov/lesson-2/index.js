const keypress = require('keypress');
const colors = require('colors');
const fs = require('fs');

const Deck = require('./deck');
const Player = require('./player');
const pathToLogs = require('./config');

class BlackJack {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Player();
  }

  _getStartingHands() {
    this.player.hit(this.deck.getCard());
    this.dealer.hit(this.deck.getCard());
    this.player.hit(this.deck.getCard());
    this.dealer.hit(this.deck.getCard());
    console.clear();
    console.log(colors.yellow('Press "H" (hit) to take another card'));
    console.log(colors.yellow('Press "S" (stand) if you wanna stand'));
    console.log('\nYour cards:');
    const cards = this.player.getCards();
    cards[0].render();
    process.stdout.write(' ');
    cards[1].render();
  }

  _playerTurn() {
    let isPlayerTurn = true;

    const playerListeners = (ch, key) => {
      if (key && key.ctrl && key.name == 'c') {
        process.exit();
      }
      if (key && key.name == 'h' && isPlayerTurn) {
        const card = this.deck.getCard();
        this.player.hit(card);

        process.stdout.write(' '.reset);
        card.render();

        if (this.player.score() > 21) {
          isPlayerTurn = false;
          process.stdin.removeListener('keypress', playerListeners);

          this._calculateWinner();
        }
      }
      if (key && key.name == 's' && isPlayerTurn) {
        isPlayerTurn = false;
        process.stdin.removeListener('keypress', playerListeners);

        this._dealerTurn();
        this._calculateWinner();
      }
    };

    process.stdin.on('keypress', playerListeners);
  }

  _dealerTurn() {
    console.log('\n\nDealer Cards: ');
    const cards = this.dealer.getCards();
    cards[0].render();
    process.stdout.write(' ');
    cards[1].render();

    while (this.dealer.score() < 17) {
      const card = this.deck.getCard();
      process.stdout.write(' ');
      card.render();
      this.dealer.hit(card);
    }
  }

  _calculateWinner() {
    const playerScore = this.player.score();
    const dealerScore = this.dealer.score();
    const log = {};
    console.log('\n');

    if (playerScore > 21) {
      console.log(colors.red("You've busted! You lose!"));
      log.message = 'Player had busted and lost.';
    } else if (dealerScore > 21) {
      console.log(colors.green('Dealer has busted! You win!'));
      log.message = 'Dealer had busted. Player won.';
    } else if (playerScore > dealerScore) {
      console.log(colors.green('You win!'));
      log.message = 'Player won.';
    } else if (playerScore < dealerScore) {
      console.log(colors.red('You lose'));
      log.message = 'Player lost.';
    } else {
      console.log('Push!');
      log.message = 'Push.';
    }

    log.time = new Date();

    const stream = fs.createWriteStream(pathToLogs, { flags: 'a' });
    stream.once('open', function(fd) {
      stream.write(`${log.time.toISOString()}: ${log.message}\n`);
      stream.end();
    });

    this._end();
  }

  start() {
    keypress(process.stdin);
    process.stdin.setRawMode(true);

    this._getStartingHands();
    this._playerTurn();
  }

  _end() {
    console.log(colors.yellow('\nPress SPACE if you want to play new game!'));
    console.log(colors.yellow('Press "C" to leave!'));

    const continueListeners = (ch, key) => {
      if (key && key.name == 'space') {
        process.stdin.removeListener('keypress', continueListeners);
        new BlackJack().start();
      }
      if (key && key.name == 'c') {
        process.stdin.removeListener('keypress', continueListeners);
        process.exit();
      }
    };
    process.stdin.on('keypress', continueListeners);
  }
}

new BlackJack().start();
