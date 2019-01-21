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
    this.dealer.push(this.deck.getCard());
    this.player.hit(this.deck.getCard());
    this.dealer.push(this.deck.getCard());
    console.log('Your cards:');
    const cards = this.player.getCards();
    console.log(cards[0].render());
    console.log(cards[1].render(), '\n');
  }

  calculateWinner() {
    const playerScore = this.player.score();
    const dealerScore = this.dealer.score();
    if (playerScore > dealerScore) {
      return 'player';
    } else if (playerScore < dealerScore) {
      return 'dealer';
    }
    return 'push';
  }

  start() {
    this.getStartingHands();
    console.log('Do you wanna get another card?');
    console.log(this.player.score());
  }
}

const game = new BlackJack();
game.start();
