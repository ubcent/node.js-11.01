const fs = require('fs');
const minimist = require('minimist');

const logPath = 'log.txt';

const arguments = minimist(process.argv.slice(2), {
	alias: {
		total: 'T',
		wins: 'W',
		loses: 'L',
		draws: 'D'
	}
});

const stats = {
	log: {},

	wasFetched: false,
	
	checkLog() {
		const fields = ['total', 'win', 'lose', 'draw', 'games'];
		
		checkField = (field) => {
			return this.log[field] != undefined;
		};
		
		return fields.every(checkField);
	},

	fetch(path) {
		if (fs.existsSync(path)) {
			this.log = JSON.parse(fs.readFileSync(path));			
			
			this.checkLog() ? this.wasFetched = true : console.log('Log file invalid');
		} else {
			console.log('File not found. Please check the path.');
		}
	},

	getTotal() {
		return this.log.total;
	},

	getCountWins() {
		return this.log.win + ` ${Math.round(this.log.win / this.log.total * 100)}%`;
	},

	getCountLoses() {
		return this.log.lose + ` ${Math.round(this.log.lose / this.log.total * 100)}%`;
	},

	getCountDraws() {
		return this.log.draw + ` ${Math.round(this.log.draw / this.log.total * 100)}%`;
	},
};

stats.fetch(logPath);

if (stats.wasFetched) {
	let result = '';
	if (arguments.total) result += `Total: ${stats.getTotal()} `;
	if (arguments.wins) result += `Wins: ${stats.getCountWins()} `;
	if (arguments.loses) result += `Loses: ${stats.getCountLoses()} `;
	if (arguments.draws) result += `Draws: ${stats.getCountDraws()} `;
	if (arguments.maxwins) {
		const games = stats.log.games;
		
		let max = 0,
			current = 0;
		
		games.forEach((game) => {
			if (game == 'win') {
				current++;
			} else {
				if (current > max) max = current;
				current = 0;
			}
		});

		if (current > max) max = current;
		
		result += `Max series of wins: ${max} `;
	}
	if (arguments.maxloses) {
		const games = stats.log.games;
		
		let max = 0,
			current = 0;
		
		games.forEach((game) => {
			if (game == 'lose') {
				current++;
			} else {
				if (current > max) max = current;
				current = 0;
			};
		});

		if (current > max) max = current;
		
		result += `Max series of loses: ${max} `;
	}
	if (arguments.last) {
		const games = stats.log.games;
		
		const res = (typeof arguments.last == 'number') ? games.slice(-arguments.last) : games.slice(-5);
		
		result += `Last: ${res.reverse().join(', ')}`;
	}
	if (result) {
		console.log(result)
	} else {
		console.log('Please use next options:\n   [-T | --total]\n   [-W | --wins]\n   [-L | --loses]\n   [-D | --draws]\n   [--maxwins]\n   [--maxloses]\n   [--last [<count>]]');
	}
};