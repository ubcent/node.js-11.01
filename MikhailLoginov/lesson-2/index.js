const { BlackJackDeck } = require('./deck');

class BlackJack {
  constructor() {
    this.deck = new BlackJackDeck();
    this.player = [];
    this.dealer = [];
  }

  start() {
    this.player.push(this.deck.getCard());
    this.dealer.push(this.deck.getCard());
    this.player.push(this.deck.getCard());
    this.dealer.push(this.deck.getCard());
    console.log('Your cards:');
    console.log(this.player[0].render());
    console.log(this.player[1].render(), '\n');
    console.log('Do you wanna get another card?');
  }
}

const game = new BlackJack();
game.start();
