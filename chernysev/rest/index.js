const app = require('express')();
const cors = require('cors')
const bodyParser = require('body-parser')

const usersRouter = require('./router/users');
const indexRouter = require('./router/index');

const authToken = require('./middleware/auth_token');

app.use(cors());
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', authToken);
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log(`server start`);
})