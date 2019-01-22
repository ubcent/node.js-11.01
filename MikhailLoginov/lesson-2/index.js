const keypress = require('keypress');
const colors = require('colors');

const Deck = require('./deck');
const Player = require('./player');
class BlackJack {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Player();
  }

  getStartingHands() {
    this.player.hit(this.deck.getCard());
    this.dealer.hit(this.deck.getCard());
    this.player.hit(this.deck.getCard());
    this.dealer.hit(this.deck.getCard());
    console.clear();
    console.log('Press "H" (hit) to take another card');
    console.log('Press "S" (stand) if you wanna stand');
    console.log('Your cards:');
    const cards = this.player.getCards();
    cards[0].render();
    process.stdout.write(' ');
    cards[1].render();
  }

  dealerTurn() {
    console.log('\nDealer Cards: ');
    const cards = this.dealer.getCards();
    cards[0].render();
    process.stdout.write(' ');
    cards[1].render();

    while (this.dealer.score() < 17) {
      const card = this.deck.getCard();
      console.log(card.render());
      this.dealer.hit(card);
    }
  }

  calculateWinner() {
    const playerScore = this.player.score();
    const dealerScore = this.dealer.score();
    console.log();
    if (playerScore > dealerScore) {
      // add logs here
      console.log('You win!');
    } else if (playerScore < dealerScore) {
      // add logs here
      console.log('You lose');
    } else {
      // add logs here
      console.log('Push!');
    }
    this.end();
  }

  start() {
    this.getStartingHands();

    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key && key.ctrl && key.name == 'c') {
        // process.stdin.pause();
        process.exit();
      }
      if (key && key.name == 'h') {
        // process.stdin.removeAllListeners();
        process.stdin.pause();
        const card = this.deck.getCard();
        this.player.hit(card);

        process.stdout.write(' '.reset);
        card.render();

        if (this.player.score() > 21) {
          console.log("\n You've busted");
          this.end();
        }
      }
      if (key && key.name == 's') {
        // process.stdin.resume();
        process.stdin.pause();
        this.dealerTurn();
        this.calculateWinner();
      }
    });
    process.stdin.setRawMode(true);
  }

  end() {
    console.log('\n Press SPACE if you want to play new game!');
    process.stdin.on('keypress', (ch, key) => {
      if (key && key.name == 'space') {
        const game = new BlackJack();
        game.start();
      }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
}

const game = new BlackJack();
game.start();
