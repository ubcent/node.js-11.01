const fs = require('fs')
const path = './db/posts';

module.exports = function (app) {
  app.get('/', (req,res) => {
    res.send('hello')
  })

  app.get('/posts', async (req,res) => {
    //не подключаю бд, имитирую ее работу через файлы, из-за этого много лишнего кода
    let posts = [];
    await fs.readdir(path, (err, items) => {
      for (let i = 0; i < items.length; i++) {
        const file = fs.readFileSync(`${path}/${items[i]}`)
        posts.push(JSON.parse(file))
      }
      res.json(posts)
    })
  })

  app.post('/posts', (req,res) => {
    const lastId = +fs.readdirSync('./db/posts').slice(-1)[0].split('.')[0] + 1 //Да костыль, ибо нет бд
    const post = req.body
    post.id = lastId
    post.created_at = new Date()
    //валидация пропускаю, позже реализую
    fs.writeFile(`${path}/${lastId}.json`,JSON.stringify(post),(err) => {
      if (err) {
        res.status(500).send()
        return
      }
    });
    res.status(201).json(post)
  })

  app.get('/posts/:id', (req,res) => {
    fs.readFile(`${path}/${req.params.id}.json`, (err,data) => {
      if (err) {
        res.status(404).send()
        return
      }
      res.json(JSON.parse(data))
    })
  })

  app.put('/posts/:id', (req,res) => {
    const pathnew = `${path}/${req.params.id}.json`
    fs.readFile(pathnew, (err, item) => {
      if (err) {
        res.status(404).send()
        return
      }
      let basePost = JSON.parse(item)
      for (key in req.body) {
        basePost[key] = req.body[key]
      }
      const filepost = JSON.stringify(basePost) //не знаю почему, если просто поставить json stryngify в writeFile не сохранял строку
      fs.writeFile(pathnew, filepost, (err) => {
        if (err) {
          res.sendStatus(500)
        }
        res.status(200).json(basePost)
      })

    })
  })

  app.delete('/posts/:id', (req,res) => {
    fs.unlink(`${path}/${req.params.id}.json`, (err) => {
      if (err) {
        res.sendStatus(404)
      }
      res.sendStatus(200)
    })
  })
}