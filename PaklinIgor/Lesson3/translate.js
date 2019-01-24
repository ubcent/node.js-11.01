const express = require('express');
const app = express();
const request = require('request');

app.get('/translate',(req,res,next) => {
    //return answers
    let text = req.query.text;
    const key = 'trnsl.1.1.20190124T175225Z.5f75df4e0174dca2.f7abc8c7500ea56876c8a0cc66acd8e833c587cb';
    const lang = 'en-ru';

    request.get(
        'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+key+'&text='+encodeURI(text)+'&lang='+lang, 
        {followAllRedirects: true}, 
        (err, resourse, data) => {
            if (!err && res.statusCode == 200) {
                const translated = JSON.parse(data);
                return res.status(200).json({
                    message: 'Yout text: ' + translated.text
                });                        
            }
        res.status(400).json({
            message: 'translation failed'
        });
    });
});

app.use('',(req,res,next)=> {
    res.status(404).json({
        message: 'try /translate route'
    });
});

app.listen(3000,()=>{
    console.log('server started');
});