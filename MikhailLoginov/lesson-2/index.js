const keypress = require('keypress');

const Deck = require('./deck');
const Player = require('./player');
class BlackJack {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Player();
  }

  getScore(player) {
    return player.length ? player.reduce((score, card) => score + card.score(), 0) : 0;
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
    // console.log(cards[0].render(), ' ', cards[1].render(), '\n');
    // process.stdout.write(`${cards[0].render()} ${cards[1].render()}`);
    cards[0].render();
    process.stdout.write(' ');
    cards[1].render();
  }

  async dealerTurn() {
    console.log('Dealer Cards: ');
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
    if (playerScore > dealerScore) {
      // return 'player';
      console.log('You win!');
    } else if (playerScore < dealerScore) {
      // return 'dealer';
      console.log('You lose');
    } else {
      // return 'push';
      console.log('Push!');
    }
  }

  start() {
    this.getStartingHands();

    keypress(process.stdin);
    process.stdin.on('keypress', async (ch, key) => {
      if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
      }
      if (key && key.name == 'h') {
        const card = this.deck.getCard();
        this.player.hit(card);

        process.stdout.write(' ');
        card.render();

        if (this.player.score() > 21) {
          console.log("\n You've busted");
          this.end();
        }
      }
      if (key && key.name == 's') {
        await this.dealerTurn();
        this.calculateWinner();
      }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  end() {
    console.log('\n Press SPACE if you want to play new game!');
    process.stdin.on('keypress', async (ch, key) => {
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
