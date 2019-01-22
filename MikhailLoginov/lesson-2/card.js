const colors = require('colors');

class Card {
  constructor(rank, suit) {
    if (!rank) {
      throw new Error('rank must be provided');
    }
    if (!suit) {
      throw new Error('suit must be provided');
    }
    this.rank = rank;
    this.suit = suit;
  }

  render() {
    switch (this.suit) {
      case 'hearts':
        process.stdout.write(`${this.rank}\u2665`.red.bgWhite);
        break;
      case 'diamonds':
        process.stdout.write(`${this.rank}$\u2666`.red.bgWhite);
        break;
      case 'spades':
        process.stdout.write(`${this.rank}\u2660`.black.bgWhite);
        break;
      case 'clubs':
        process.stdout.write(`${this.rank}\u2663`.black.bgWhite);
        break;
      default:
        throw new Error('wrong suit format');
    }
  }

  score() {
    return /\D/.test(this.rank) ? (this.rank === 'A' ? 11 : 10) : +this.rank;
  }
}

module.exports = Card;
