const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
app.use(bodyParser.json())

require('./routes')(app)

app.listen(8888, () => {
  console.log(`server started`)
})