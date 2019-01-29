const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'../client/dist')))

require('./routes')(app)

app.listen(8888, () => {
  console.log(`server started`)
})