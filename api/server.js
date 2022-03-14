const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World");
});

const authRoutes = require("./routes/auth");
server.use("/auth", authRoutes);

const usersRoutes = require("./routes/users");
server.use("/users", usersRoutes);

// server.get("/users/:username", async (req, res) => {
//   const user = await User.findByUsername(req.params.username);
//   res.json(user);
// });

module.exports = server;
