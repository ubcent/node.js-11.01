const request = require('request-promise');
const cheerio = require('cheerio');
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let news = [];
const baseURL = 'https://www.hltv.org';

request({
  uri: baseURL,
  transform: function(body) { return cheerio.load(body); }
}).then(function($) {
  const $news = $('.newsheader:contains(\'Today\')').next().find('a.newsline');
  console.log(chalk.blue('Last HLTV.org news'));
  news = $news.map((i, n) => {
    const link = $(n).attr('href');
    const title = $(n).find('.newstext').text();
    console.log(`${i+1}: ${title}`);
    return {link: link, title: title}
  });
  question();
}).catch(function (err) {
  console.log(err)
});

function question() {
  rl.question(chalk.green('Выберите новость: '), (text) => {
    if (text === '0') {
      rl.close();
    } else {
      getArticle(text);
    }
  });
}

function getArticle(id) {
  if (isNaN(parseInt(id)) || id < 0 || id - 1 > news.length) {
    console.log('Такого номера статьи нет');
    question();
  } else {
    request({
      uri: 'https://www.hltv.org' + news[id - 1].link,
      transform: function (body) {
        return cheerio.load(body);
      }
    }).then(function ($) {
      console.log(chalk.black.bgWhite(news[id - 1].title));
      $('.newstext-con > p').map((i, q) => {
        console.log($(q).text())
      });
      question();
    }).catch(function (err) {
      console.log(err);
    })
  }
}