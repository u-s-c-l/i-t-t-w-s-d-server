const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

const User = require("./models/User");

server.get("/", (req, res) => {
  res.send("Hello World");
});


server.get("/users/:username", async (req, res) => {
  const user = await User.findByUsername(req.params.username);
  res.json(user);
});

const authRoutes = require("./routes/auth");
server.use("/auth", authRoutes);

module.exports = server;
