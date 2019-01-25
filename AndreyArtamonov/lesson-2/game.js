const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const random = (max) => {
	return Math.floor(Math.random() * max);
}

const logPath = 'log.txt';

const game = {
	cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"],

	deck: [],

	userCards: [],

	dealerCards: [],

	createDeck() {
		this.cards.forEach((card) => {
			for (let i = 0; i < 4; i++) {
				this.deck.push(card);
			}
		});
	},

	getCard() {
		const numberCard = random(this.deck.length);

		return this.deck.splice(numberCard, 1);
	},

	caltucateScore(cards) {
		let score = 0;

		cards.forEach((card) => {
			if (card == 'A') return;

			score += (!isNaN(card)) ? +card : 10;
		});

		cards.forEach((card) => {
			if (card == 'A') {
				score += (score > 11) ? 1 : 11;
			}
		})

		return score;
	},

	userGame() {
		console.log('Hi! Do you want to play some game? [press n to finish game or any key to continue]')

		rl.on('line', (answer) => {
			if (answer == 'n' || answer == 'no' || answer == 'N' || answer == 'NO') {
				if (this.userCards.length) {
					console.log(`Ok! Your score is ${this.caltucateScore(this.userCards)}.\n`);
					this.dealerGame();
				} else {
					console.log('Gambling is better not to play. It\'s true!');
				}
				rl.close();
				return;
			}

			this.userCards.push(this.getCard());

			console.log(`You received ${this.userCards[this.userCards.length - 1]}. All cards: ${this.userCards.join(", ")}.`);

			const score = this.caltucateScore(this.userCards);
			
			if (score < 21) {
				console.log(`Your score is ${score}. One more card? [press n to finish game or any key to continue]`);
			} else if (score > 21) {
				console.log(`Oh! You lose. Your score is ${score}. You will be lucky next time!`);
				rl.close();
				this.saveRecord('loss');
			} else {
				console.log('Oh! That\'s good luck! Your score is 21!\n');
				rl.close();
				this.dealerGame();
			}
		})
	},

	dealerGame() {
		let wantToPlay = true;

		while (wantToPlay) {
			this.dealerCards.push(this.getCard());

			const score = this.caltucateScore(this.dealerCards);
			const userScore = this.caltucateScore(this.userCards);

			console.log(`I received ${this.dealerCards[this.dealerCards.length - 1]}. All cards: ${this.dealerCards.join(", ")}. My score is ${score}.`);

			if (score > 21) {
				wantToPlay = false;
				console.log('You won. My congratulations!');
				this.saveRecord('win');
			} else if (score > userScore) {
				wantToPlay = false;
				console.log('Sorry, but now i won.');
				this.saveRecord('loss');
			} else if (score == 21) {
				wantToPlay = false;
				if (userScore == 21) {
					console.log('This is a draw!');
					this.saveRecord('draw');
				} else {
					console.log('Sorry, but now i won.');
					this.saveRecord('loss');
				}
			} else if (score == userScore) {
				switch (score) {
					case 20:
					case 19:
						wantToPlay = false;
						console.log('This is a draw!');
						this.saveRecord('draw');
						break;
					case 18:
						if (this.dealerCards.indexOf("A") != -1 || this.dealerCards.indexOf("2") != -1 || this.dealerCards.indexOf("3") != -1) {
							wantToPlay = false;
							console.log('This is a draw!');
							this.saveRecord('draw');
						};
						break;
					case 17:
					if (this.dealerCards.indexOf("A") != -1 || this.dealerCards.indexOf("2") != -1 || this.dealerCards.indexOf("3") != -1 || this.dealerCards.indexOf("4") != -1) {
						wantToPlay = false;
						console.log('This is a draw!');
						this.saveRecord('draw');
					};
					break;
				}
			}
		}
	},
	
	checkLog(log) {
		const fields = ['total', 'win', 'loss', 'draw', 'games'];
		
		checkField = (field) => {
			return log[field] != undefined;
		};
		
		return fields.every(checkField);
	},
	
	fetchStats(path) {
		if (fs.existsSync(logPath)) {
			const log = JSON.parse(fs.readFileSync(logPath));
			
			if (this.checkLog(log)) {
				return log;
			}
		};
		return {total: 0, win: 0, loss: 0, draw: 0, games: []};
	},
	
	saveRecord(result) {
		const log = this.fetchStats(logPath);
		
		++log.total;
		++log[result];
		log.games.push(result);

		fs.writeFile(logPath, JSON.stringify(log), (err) => {
			if (err) throw err;
		})
	},

	start() {
		this.createDeck();

		this.userGame();
	}
}

game.start();