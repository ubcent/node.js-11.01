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
    let suitSymbol = '';
    switch (this.suit) {
      case 'hearts':
        suitSymbol = '\u2665';
        process.stdout.write(`${this.rank}${suitSymbol}`.red.bgWhite);
        break;
      case 'diamonds':
        suitSymbol = '\u2666';
        process.stdout.write(`${this.rank}${suitSymbol}`.red.bgWhite);
        break;
      case 'spades':
        suitSymbol = '\u2660';
        process.stdout.write(`${this.rank}${suitSymbol}`.black.bgWhite);
        break;
      case 'clubs':
        suitSymbol = '\u2663';
        process.stdout.write(`${this.rank}${suitSymbol}`.black.bgWhite);
        break;
      default:
        throw new Error('wrong suit format');
    }
  }

  score() {
    if (this.rank === 'A') {
      return 11;
    }
    return /\D/.test(this.rank) ? 10 : +this.rank;
  }
}

module.exports = Card;
