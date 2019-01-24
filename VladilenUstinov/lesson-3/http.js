const https = require('https');

https.get('https://flyontime.ru', (res) => {
    console.log('Response', res.statusCode);
}).on('error', (err) => {
    console.error(err);
});