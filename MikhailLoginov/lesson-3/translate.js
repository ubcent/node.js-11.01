const fetch = require('node-fetch');

const translationLink =
  'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' +
  process.env.YANDEX_TRANSLATOR_KEY;

const text = 'test';

(async () => {
  const res = await fetch(translationLink + '&text=' + text);
  console.log(res.body);
  const translation = await res.json();
  console.log(translation);
})();
