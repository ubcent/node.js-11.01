const express = require('express')
const request = require('request');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.static('./'));

app.get('/', (req, res, next) => {
    res.send('index.html')
})

app.get('/translate', (req, res, next) => {
    if(req.query.text){
        const stringToTranslate = 'text='+req.query.text;
        const encodedUrl = encodeURI(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190130T144950Z.3a8878465fd29e29.c462a5566ec226ce8c1a89ed869f73c568f79b18&lang=en-ru&${stringToTranslate}`);
        request({
            method: 'GET',
            uri:encodedUrl ,
            }, function (error, response, body) {
                if (error) {
                    console.error(error);
            } else {
                const responseData = JSON.parse(body).text;
                res.status(200).send(responseData[0])
            }
        });   
    }else{
        res.status(400).send()
    }
    
    
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})