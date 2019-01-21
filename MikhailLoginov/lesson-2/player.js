class Player {
  constructor(money = 1000) {
    this.money = money; // not yet implemented
    this.cards = [];
  }

  hit(card) {
    this.cards.push(card);
  }

  score() {
    let softScore = this.cards.length
      ? this.cards.reduce((score, card) => score + card.score(), 0)
      : 0;
    let thereIsNoSoftAce = false;
    while (softScore > 21 && !thereIsNoSoftAce) {
      const softAce = this.cards.find(card => card.score() === 11);
      if (softAce) {
        softAce.score = () => 1;
        softScore -= 10;
      } else {
        thereIsNoSoftAce = true;
      }
    }
    return softScore;
  }

  getCards() {
    return this.cards;
  }
}

module.exports = Player;
