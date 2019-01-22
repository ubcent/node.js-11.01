const readline = require('readline');
const colors = require('colors/safe');
const fs = require('fs');

let deck;
const deckColors = ['s','c','d','h'];
const deckCards = ['J','Q','K'];
const LOG_FILE = './game_log.txt';

let humanHand,dilerHand;
let humanPoints,dilerPoints;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const createDeck = () => {
    deck = [];
    for (i=2;i<=10;i++) {
        for (j=0;j<4;j++){
            deck.push({
                card: ''+i+deckColors[j],
                points: i
            });
        }
    }
    for (i=0;i<3;i++) {
        for (j=0;j<4;j++){
            deck.push({
                card: deckCards[i]+deckColors[j],
                points: 10
            });
        }
    }
    for (j=0;j<4;j++){
        deck.push({
            card: 'A'+deckColors[j],
            points: 11,
            pointsLow: 1
        });
    }
}

const getCard = () => {
    cardIndex = Math.floor(Math.random()*(deck.length+1));
    card = {...deck[cardIndex]};
    deck = [...deck.slice(0,cardIndex),...deck.slice(cardIndex+1)];
    // console.log(cardIndex,card,deck);
    return card;
}

const getCards = (cards) => {
    let cardsInString = '';
    cards.forEach(element => {
        cardsInString += ',' + element.card;
    });

    return cardsInString.slice(1);
}

const countPoints = (cards) => {
    let points = 0;
    let pointsLow = 0;
    cards.forEach(element => {
        if (!element.pointsLow) {
            points += element.points;
        } else {
            points += 1;
            pointsLow++;
        }
    });
    const rest = 21 - points;
    if (rest > 0) {
        points += 10 * Math.min(Math.floor(rest/10),pointsLow);
    }

    return points;
}

const askUser = () => {
    rl.question('card? (y/n) ', (line) => {
        if (line === 'y') {
            humanHand.push(getCard());
            humanPoints = countPoints(humanHand);
            console.log(colors.yellow('Your cards: '+getCards(humanHand)), colors.yellow.italic('points: '+humanPoints));
            askUser();
        } else if (line !== 'n') {
            askUser();
        } else {
            //getting cards for diler (simple code stopping after 18 points)
            while (dilerPoints < 18) {
                dilerHand.push(getCard());
                dilerPoints = countPoints(dilerHand);
            }

            //show result
            let result;
            if (humanPoints===dilerPoints || (humanPoints> 21 && dilerPoints >21)) {
                result = 'draw';
                console.log(colors.grey(result));
            } else if ((humanPoints <= 21 && dilerPoints > 21) || (humanPoints <= 21 && dilerPoints<humanPoints)) {
                result = 'your win';
                console.log(colors.green(result));
            } else {
                result = 'your loose';
                console.log(colors.red(result));
            };
            console.log(colors.yellow('Your cards: '+getCards(humanHand)), colors.yellow.italic('points: '+humanPoints));
            console.log(colors.yellow('Diler\' cards: '+getCards(dilerHand)), colors.yellow.italic('points: '+dilerPoints));
            if (fs.existsSync(LOG_FILE)) {
                fs.appendFileSync(LOG_FILE,result+'\n');
            } else {
                fs.createFileSync(LOG_FILE,result+'\n');
            }
            //request for next game
            askNewGame();
        };
    });
}

const askNewGame = () => {
    rl.question('new game? (y/n) ', (line) => {
        if (line === 'n') {
            rl.close();
        } else if (line === 'y') {
            newGame();
        } else {
            askNewGame();
        }
    });
}

const newGame = () => {
    createDeck();
    humanHand = [];
    dilerHand =[];
    console.log(colors.green('======Game start======='));
    //first 2 cards for both
    humanHand.push(getCard());
    dilerHand.push(getCard());
    humanHand.push(getCard());
    dilerHand.push(getCard());
    humanPoints = countPoints(humanHand);
    dilerPoints = countPoints(dilerHand);
    console.log(colors.yellow('Your cards: '+getCards(humanHand)), colors.yellow.italic('points: '+humanPoints));

    //waiting for card for human
    askUser();
}

newGame();