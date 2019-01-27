let fs = require('fs');
let obj = JSON.parse(fs.readFileSync('db.json', 'utf8'));

for (key of obj) console.log(key.title);