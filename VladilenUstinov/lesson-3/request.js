const request = require('request');

request('https://flyontime.ru', (err, response, output) => {
    if (!err && response.statusCode === 200) {
        console.log(output);
    }
});