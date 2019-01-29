const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const cors = require('cors');
const db = [];

request('http://www.eurosport.ru/', function (error, response, html){
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var k = 0;
    var id = 1;
    $('.storylist-latest__main-title').each(function(i, element){   
      var titles = $(this).find('a');
      var categorycontainers = $('.storylist-latest__category-title').eq(k);
      var categories = categorycontainers.find('span');
      var obj = {id: id, content:titles.eq(0).text(), category: categories.eq(0).text()};
      db.push(obj);
      k = k+1;
      id = id+1;
    });   
          fs.writeFile('db.json', JSON.stringify(db), (err) => {  
            if (err) throw err;
        });
    }
});

const path = require('path');

const express = require('express');

const app = express();
app.use(cors());

fs.readFile('db.json', (err, data) => {
  if (err) throw err;
  var items = JSON.parse(data);
    app.get('/api/newsitems', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'items retrieved successfully',
      items
    })
  });
})

app.listen(8888, () => {
  console.log('Server has been started');
});
