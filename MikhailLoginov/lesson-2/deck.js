const Card = require('./card');

class Deck {
  constructor() {
    this.deck = this.newDeck();
  }

  newDeck() {
    const deck = [];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; // 'jack', 'queen', 'king', 'ace'
    const suits = ['diamonds', 'hearts', 'spades', 'clubs'];
    ranks.forEach(rank => suits.forEach(suit => deck.push(new Card(rank, suit))));
    return deck;
  }

  getCard() {
    if (!this.deck.length) {
      throw new Error('this deck is empty');
    }
    const cardNumber = Math.floor(Math.random() * this.deck.length);
    return this.deck.splice(cardNumber, 1)[0];
  }

  getAllCards() {
    return this.deck;
  }
}

module.exports = Deck;
