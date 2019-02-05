# Homework № 5

## Install

```
npm i
npm start
```

## Description
| Action | Path | Fields |
| --- | --- | --- |
| Get all tasks | localhost:8888 | - |
| Add the task | localhost:8888/add | title: required<br>priority: optional<br>(default: medium) |
| Get the task by id | localhost:8888/get-task | id: required |
| Increase priority of the task | localhost:8888/increase-priority | id: required |
| Lower priority of the task | localhost:8888/lower-priority | id: required |
| Start the task | localhost:8888/start-task | id: required |
| Finish the task | localhost:8888/finish-task | id: required |