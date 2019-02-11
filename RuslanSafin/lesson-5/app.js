const express =     require('express');
const shoplist =    require('./shoplist');
const bodyParser =  require('body-parser');
// const mysql =       require('mysql2');
// const db =          require('./database');


const app = express();
const PORT = process.env.PORT || 4001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./node_modules/mdbootstrap'));



app.get('/', (req,res, next)=>{
    res.send('index.html');
})


app.get('/all', shoplist.getAll())

app.post('/', shoplist.addItem())

app.delete('/', shoplist.removeItem())
 
app.put('/', shoplist.updateItem())



app.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`);
})