const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

require('dotenv').config();

const newsBaseLink =
  'https://newsapi.org/v2/top-headlines?sortBy=publishedAt&apiKey=' +
  process.env.NEWSAPI_KEY;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/news', async (req, res) => {
  if (!req.body) {
    res.sendStatus(404);
  }

  const {
    keyword,
    category,
    country,
  } = req.body;
  const keywordQuery = keyword ? `&q=${keyword}` : '';
  const categoryQuery = category ? `&category=${category}` : '';
  const countryQuery = country ? `&country=${country}` : '';

  const newsLink = newsBaseLink + keywordQuery + categoryQuery + countryQuery;
  const newsRes = await fetch(newsLink);
  const news = await newsRes.json();

  res.send(news);
});

app.listen(3005, () => {
  console.log('Server is listening on port 3005!');
});
