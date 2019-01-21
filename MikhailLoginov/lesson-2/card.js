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
        break;
      case 'diamonds':
        suitSymbol = '\u2666';
        break;
      case 'spades':
        suitSymbol = '\u2660';
        break;
      case 'clubs':
        suitSymbol = '\u2663';
        break;
      default:
        throw new Error('wrong suit format');
    }
    return `${this.rank}${suitSymbol}`;
  }

  score() {
    if (this.rank === 'A') {
      return 11;
    }
    return /\D/.test(this.rank) ? 10 : +this.rank;
  }
}

module.exports = Card;
