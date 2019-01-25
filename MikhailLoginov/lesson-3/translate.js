const fetch = require('node-fetch');
const keypress = require('keypress');

require('dotenv').config();

const translationLink =
  'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' +
  process.env.YANDEX_TRANSLATOR_KEY +
  '&lang=en-ru&format=plain';

(async () => {
  keypress(process.stdin);
  process.stdin.setRawMode(true);

  let text = '';
  process.stdout.write('Enter a text to translate: ');
  const wordListener = async (ch, key) => {
    if (key && key.ctrl && key.name == 'c') {
      process.exit();
    }
    if (key && key.name === 'return') {
      process.stdin.removeListener('keypress', wordListener);
      const res = await fetch(translationLink + '&text=' + text, {
        method: "POST"
      });
      const translation = await res.json();
      console.log('\nTranslation:', translation.text[0]);
      process.exit();
    }
    if (key) {
      text += key.name;
      process.stdout.write(key.name);
    }
  };

  process.stdin.on('keypress', wordListener);

})();
