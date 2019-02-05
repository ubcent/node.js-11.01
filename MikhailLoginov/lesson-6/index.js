/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const { router } = require('./src/routes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', router);

const options = {
  useNewUrlParser: true,
  autoReconnect: true
};

mongoose
  .connect(
    process.env.MONGO_HOST,
    options
  )
  .then(() => console.log('MongoDB connected...'))
  .catch(console.error);

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Server started on port ${port}`));
