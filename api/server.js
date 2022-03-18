const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "netlify.app"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




server.get("/", (req, res) => {
   res.send("Hello World");
 });

const authRoutes = require("./routes/auth");
server.use("/auth", authRoutes);

const usersRoutes = require("./routes/users");
server.use("/users", usersRoutes);

const scoresRoutes = require("./routes/scores");
server.use("/scores", scoresRoutes);

module.exports = server;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
