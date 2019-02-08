const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRouter = require('./router/users');
const indexRouter = require('./router/index');

const authToken = require('./middleware/auth_token');

mongoose.connect('mongodb://localhost:27017/test', {
  useCreateIndex: true,
  useNewUrlParser: true
});

app.use(cors());
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', authToken);
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log(`server start`);
})