const fetch = require('node-fetch');
const colors = require('colors');

require('dotenv').config();

const newsLink =
  'https://newsapi.org/v2/top-headlines?country=ru&sortBy=publishedAt&apiKey=' +
  process.env.NEWSAPI_KEY;

(async () => {
  const res = await fetch(newsLink);
  const news = await res.json();
  news.articles.forEach(article => {
    console.log(article.title.red);
    console.log(article.description.green, '\n');
  });
})();
