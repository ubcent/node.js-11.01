const readline = require('readline');
const fs = require('fs');
const prompts = require('prompts');

const randomize = () => {
    return Math.round(Math.random());
}

const getCoinSide = () =>{
    return randomize() === 1 ? 'tail' : 'head'
}

(async function(){
    const response = await prompts({
        type: 'select',
        name: 'value',
        message: 'Select:',
        choices: [
            { title: 'Start new game', value: '1' },
            { title: 'Get game stats', value: '2' }
        ],
        initial: 0
    });

    if(response.value === '1'){
        startGame();
    }else{
        getStat()
    }
})();

 

function startGame(){
    //make coinflip
    const coin = getCoinSide();
    //get user answer
    let userAnswer = '';
    let result = 0;
    const rl = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    })

    rl.question('Coin is flipping... Tail or Head?(t/h): ', (answer) => {
        if(answer === 't'){
            userAnswer = 'tail'
        }else{
            userAnswer = 'head'
        } ;
        if(userAnswer === coin){
            console.log(`It's ${coin}.You Won!`)
            result = 1;
        }else{
            console.log(`It's ${coin}.You Lost!`)
        }
        fs.appendFile('log.txt', result, null, ()=>{
            console.log('Result logged')
        })
        
        rl.close();
    })
}


function getStat(){
    fs.readFile('log.txt',null ,(err, data)=>{
        if(err){
            if(err.code === 'ENOENT'){
               let newError =  new Error('!!!ERROR!!! log.txt has not found. Create it in catalog with app.js and or play game at least one time')
               throw newError;
            }
            console.err(err)
        }
        results = data.toString().split('');
        results = results.map((arg)=>{
           return parseInt(arg)
        })
        let totalWins = results.reduce((prev,next)=>{
            return prev+next;
        })
        let totalLose = results.length - totalWins;

        let winStreak = results.reduce((res, n) => 
            (n ? res[res.length-1]++ : res.push(0), res)
        , [0])

        let loseStreak = results.reduce((res, n) => 
            (n === 0 ? res[res.length-1]++ : res.push(0), res)
        , [0])

        console.log(`Общее число сыгранных партий:  ${results.length}`)
        console.log(`Общее число выгранных партий:  ${totalWins} (${(totalWins/results.length)*100}%)`)
        console.log(`Общее число проигранных партий: ${totalLose} (${(totalLose/results.length)*100}%)`)
        console.log(`Соотношение побед/поражений: ${Math.round((totalWins/totalLose)*100)} побед на 100 поражений`)
        console.log(`Максимальное число побед подряд: ${Math.max(...winStreak)}`)
        console.log(`Максимальное число поражений подряд: ${Math.max(...loseStreak)}`)
    })
}


