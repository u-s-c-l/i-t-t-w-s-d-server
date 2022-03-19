const app = require("./server");
//const cors = require("cors");
const port = process.env.PORT || 3003;

app.listen(port, () =>
  console.log(`Express now departing from port ${port}...`)
);

// Socket io stuff

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
//server.use(cors("*"));
//const io = socketio(server)
// const io = socketio(server, {
//   cors: {
//     origin: '*',
//     methods: ["GET", "POST"],
//     allowedHeaders: ['Content-Type', 'Authorization','my-custom-header'],
//     credentials: false,
//   },
// });

const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3000", "https://staging--ultimate-quiz-game.netlify.app/"]
  }
});

global.io = io;


io.on('connection', (socket) => {
  console.log("user connected")
  socket.on('create-room', (room, difficulty, currentQ, questions) => {
    socket.to(room).emit('start-game', difficulty, currentQ, questions);
  });

  socket.on("join-room", (room, username) => {
    socket.join(room)
    socket.to(room).emit("join-game", username);
  });

  socket.on("new-message", (data) => {
    socket.broadcast.emit("broadcast-message", {
      username: users[data.username],
      message: data.message,
    });
  });

  socket.on("game-over", (room, username, score) => {
    socket.to(room).emit("end-game", username, score);
  });
});
