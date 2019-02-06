const express = require('express');
const yandex = require('./yandex');
const lenta = require('./lenta');
const bodyParser = require('body-parser');



const app = express();
const PORT = process.env.PORT || 4001;





app.use(express.static('./node_modules/mdbootstrap'));
app.use(bodyParser.json());
app.get('/', (req,res, next)=>{
    res.send('index.html');
})

app.use('/yandex', yandex);
app.use('/lenta', lenta);


app.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`);
})