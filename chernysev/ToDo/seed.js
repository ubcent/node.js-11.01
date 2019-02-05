const mongoose = require('mongoose');
const faker = require('faker');
const Task = require('./model/task');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
});

for (let i = 0; i < 10; i++) {
  const obj = JSON.parse(faker.fake('{"title" : "{{lorem.word}}", "description": "{{lorem.sentence}}"}'));
  // console.log(obj);
  const task = new Task(obj);
  task.save();
}

console.log('ok');