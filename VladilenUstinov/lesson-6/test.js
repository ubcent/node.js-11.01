const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const port = 9999;

const app = express();

app.use(cookieParser());
app.use(session({keys: ['secret']}));

app.use((req, res, next) =>{
    let n = req.session.views || 0;
    req.session.views = ++n;
    console.log('hi all');
    res.send('Ну че? чече? ниче');
    res.end(`${n} views`);

});

app.listen(port, () => {
    console.log(`Server has been started http://localhost:${port}`);
});