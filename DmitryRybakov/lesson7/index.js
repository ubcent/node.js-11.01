const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const User = require("./models/user");

const app = express();
app.use(cors());
app.use(bodyParser.json());

function validateToken(req, res, next) {
	if(req.headers.authorization) {
		const [type, token] = req.headers.authorization.split(" ");
		jwt.verify(token, "secret", (err, decoded) => {
			if(err) {
				return res.status(403).json({ message: "Wrong token" });    
			}

			req.user = decoded;
			next();
		});
	} else {
		res.status(403).json({ message: "Token is empty" });
	}
}

app.use("/users", validateToken);

app.get("/users", async (req, res) => {
	try{
		const users = await User.getAll();
		
		res.json(users);
	}catch(e){
		res.status(400).json({ message: "Wrong request" });
	}
});

app.post("/users", async (req, res) => {
	const new_user = req.body;
	
	if (typeof(new_user) == "object"){
		await User.addUser(new_user);
		
		res.json({message: "Ok"});
	}else{
		res.json({message: "Bad"});
	}
});

app.put("/users/:id", async (req, res) => {
	const new_data = req.body;
	
	if (typeof(new_data) == "object" && req.params.id){
		await User.updateUser(new_data, req.params.id);
		
		res.json({message: "Ok"});
	}else{
		res.json({message: "Bad"});
	}
});

app.delete("/users/:id", async (req, res) => {
	if (req.params.id){
		await User.deleteUser(req.params.id);
		
		res.json({message: "Ok"});
	}else{
		res.json({message: "Bad"});
	}
});

app.post("/auth", async (req, res) => {
	const { username, password } = req.body;
	
	try{
		let user = await User.findOne(username);
		
		/*
		Столкнулся с проблемой, которую обсуждали на вебинаре. Решить не смог.
		База выдает вот что:
		RowDataPacket { id: 1, email: "test1@test.ru", fio: null }
		А jwt на это ругается ошибкой:
		Expected "payload" to be a plain object
		Похоже, что только с mysql такая проблема.
		Так что делаю так)
		*/
		let parsedstring = JSON.stringify(user);
		user = JSON.parse(parsedstring);
		
		if(!user) {
			res.status(403).json({ message: "Wrong credentials" });
		}else{
			if(crypto.createHmac("sha1", "123456").update(password).digest("hex") === user.password) {
				delete user.password;

				const token = jwt.sign(user, "secret", { expiresIn: "30d" });
				res.json({
					token,
				});
			}else{
				res.status(403).json({ message: "Wrong credentials" });
			}
		}
	}catch(e){
		res.status(400).json({ message: "Wrong request" });
	}
});

app.listen(8888, () => {
	console.log("Server has been started");
});

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUB0ZXN0LnJ1IiwiZmlvIjpudWxsLCJpYXQiOjE1NDk1NjI3MDYsImV4cCI6MTU1MjE1NDcwNn0.G6hJc1T8TD5zLUhQ1Oli6XY8cGq9vPNPdGahMfpwxcY
*/