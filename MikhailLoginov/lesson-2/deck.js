const { Card, BlackJackCard } = require('./card');

class Deck {
  constructor(size = 52) {
    const possibleSizes = [36, 52, 54];
    if (possibleSizes.indexOf(size) === -1) {
      throw new Error('this deck size is not supported');
    }
    this.size = size;
    this.deck = this.newDeck();
  }

  newDeck() {
    const deck = [];
    let ranks = [];
    if (this.size === 36) {
      ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    } else {
      ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; // 'jack', 'queen', 'king', 'ace'
    }
    const suits = ['diamonds', 'hearts', 'spades', 'clubs'];
    ranks.forEach(rank => {
      suits.forEach(suit => {
        const card = new Card(rank, suit);
        deck.push(card);
      });
    });
    if (this.size === 54) {
      const joker = new Card('joker');
      deck.push(joker, joker);
    }
    return deck;
  }

  getCard() {
    if (!this.deck.length) {
      throw new Error('this deck is empty');
    }
    const cardNumber = Math.floor(Math.random()*this.deck.length);
    return this.deck.splice(cardNumber, 1)[0];
  }

  getAllCards() {
    return this.deck;
  }
}

class BlackJackDeck extends Deck {
  constructor() {
    super(52);
  }

  newDeck() {
    const deck = [];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['diamonds', 'hearts', 'spades', 'clubs'];
    ranks.forEach(rank => {
      suits.forEach(suit => {
        const card = new BlackJackCard(rank, suit);
        deck.push(card);
      });
    });
    return deck;
  }
}

module.exports = { Deck, BlackJackDeck };
