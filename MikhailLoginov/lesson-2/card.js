class Card {
  constructor(rank, suit) {
    if (!rank) {
      throw new Error('rank must be provided');
    }
    if (rank !== 'joker' && !suit) {
      throw new Error('suit must be provided');
    }
    this.rank = rank;
    this.suit = rank === 'joker' ? null : suit;
  }

  render() {
    if (this.rank === 'joker') {
      return 'Joker';
    }
    let suitRender = '';
    switch (this.suit) {
      case 'hearts':
        suitRender = '\u2665';
        break;
      case 'diamonds':
        suitRender = '\u2666';
        break;
      case 'spades':
        suitRender = '\u2660';
        break;
      case 'clubs':
        suitRender = '\u2663';
        break;
      default:
        throw new Error('wrong suit format');
    }
    return `${this.rank}${suitRender}`;
  }
}

class BlackJackCard extends Card {
  constructor(rank, suit) {
    super(rank, suit);
  }

  score() {
    return /\D/.test(this.rank) ? 10 : +this.rank;
  }
}

module.exports = { Card, BlackJackCard };
