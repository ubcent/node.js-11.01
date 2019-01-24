const readline = require('readline');
const ansi = require('ansi');
const cursor = ansi(process.stdout);
const file = require('fs');

/*file.writeFile('statistics','', (err,data) =>{
    if(err) {throw err;}
    
});*/
console.log('Hello! This is the simple game "1 or 2"');


var int = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
var wins = 0;
var loss = 0;
var Name='';
int.question('Please write your name ', (name) => {
    console.log(`Hello ${name}`);
    Name = name;
    int.question('Do you want play the game(yes/no) ', (answer) => {
        
        if ((answer === 'yes') || (answer === 'Yes') || (answer === 'YES')){
            console.log(`Let's play ${name}. if you want to finish the game please write "exit"`);
            game();
        } else {
            console.log("Bye!");
            int.close();
        }
    })
})

const game = function () {
        int.question('Write 1 or 2 and press "Enter" ', (number) =>{
            if (checkWriting(number)){
               let random= getRandomInt(1,2);
               console.log(random);
               if (number == random) {
                    console.log('You Win!!!');
                    wins++;
                    game();                     
                } else {
                    console.log('You lose!');
                    loss++;
                    game();
                }
            }
        })
}

const checkWriting = (num) =>{
    if (!isNaN(num)) {
        return true;
    } else if(num ==='exit') {
        cursor.red().write(`${Name} Wins = ${wins}, Losses = ${loss}`).reset();
        let text = `${Name} Wins = ${wins}, Losses = ${loss}`;
        int.close();
        file.appendFileSync('./statistics',`${text}\n`,(err,data)=>{
            if (err) {throw err;}
        } )
    } else {
        console.log(`${num} is't correct. Please write 1 or 2`);
        game();
   }
}


function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
