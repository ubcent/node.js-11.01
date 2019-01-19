const readline = require('readline');

const rl = readline.createInterface({ 
	input: process.stdin,
	output: process.stdout
});

const fs = require('fs');

function randomnumber(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addcard(){
	const cards = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	return cards[randomnumber(0, cards.length -1)];
}

function count(hand){
	var sum = 0;

	for (var i = 0; i < hand.length; i++) {
		var card = hand[i];
		if(card !== "A"){
			if(card == "J" || card == "Q" || card == "K"){
				sum = sum + 10;
			}
			else {
				sum = sum + parseInt(card);
			}
		}
	}

	for (var i = 0; i < hand.length; i++) {
		var card = hand[i];	
		if(card == "A"){
			if(sum > 10){
				sum = sum + 1;
			}
			else{
				sum = sum + 11;
			}
		}
	}

	return sum;
}

function showstate(){
	return "dealer: " + dealer.join(' ') + "\n" + "player: " + player.join(' ');
}

var dealer = [addcard()];
var player = [addcard(), addcard()];

var data = fs.readFileSync("log.txt", "utf8");
var log = JSON.parse(data);

if (count(player) == 21){
	console.log("Wow! Blackjack!!!");
	console.log(showstate());
	rl.close();
	log.totalgames = log.totalgames+1;
	log.wins = log.wins+1;
	fs.writeFile('log.txt', JSON.stringify(log), (err) => {  
		if (err) throw err;
		console.log('Log saved!');
	});	
}
else{
	log.totalgames = log.totalgames+1;
	console.log(showstate());
 	rl.question('Get one more card? Press 1 for yes, any key for no', function(answer) {
		do {
	 		if(answer == "1"){
			 	player.push(addcard());
			 	if(count(player) > 21){
			 		console.log("Too many points!");
			 		console.log(showstate());
			 		rl.close();
			 		log.losses = log.losses+1;
			 		break;
			 	}
			 	else if (count(player) == 21){
			 		console.log("Black Jack!");
			 		console.log(showstate());
			 		rl.close();
			 		log.wins = log.wins+1;
			 		break;
			 	}
			 	else if(count(player) < 21){
				 	console.log(showstate());
				 	rl.question('Get one more card? Press 1 for yes, 0 for no', function(answer2) {
				 		if(answer2 == "1"){
				 			player.push(addcard());
				 			break;
				 		}
				 	});
			    }
			}
			else{
				while(count(dealer) < 17){
					dealer.push(addcard());
				}
				if(count(dealer) == 21){
					console.log("Dealer has got Black Jack! :(");
					console.log(showstate());
			 		rl.close();
			 		log.losses = log.losses+1;
			 		break;
				}
				else if(count(dealer) > 21){
					console.log("Dealer has too many points! :)");
					console.log(showstate());
			 		rl.close();
			 		log.wins = log.wins+1;
			 		break;
				}
				else if(count(dealer) == count(player)){
					console.log("Draw! :|");
					console.log(showstate());
			 		rl.close();
			 		log.draws = log.draws+1;
			 		break;
				}
				else if(count(dealer) < count(player)){
					console.log("You win! :))");
					console.log(showstate());
			 		rl.close();
			 		log.wins = log.wins+1;
			 		break;
				}
				else if(count(dealer) > count(player)){
					console.log("You lose! :((");
					console.log(showstate());
			 		rl.close();
			 		log.losses = log.losses+1;
			 		break;
				}
			}

		}while (answer == "1");

			fs.writeFile('log.txt', JSON.stringify(log), (err) => {  
			    if (err) throw err;
			    console.log('Log saved!');
			});	
	});

}



