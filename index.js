const app = require("./app");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"],
  },
});

const online = [];

io.on("connection", async (socket) => {
  socket.on("name", (message) => {
    const { name } = message;
    online.push(name);
    console.log(online);
  });

  socket.on("chat message", ({ message }) => {
    io.emit("server emit", { message });
  });
});

const port = process.env.PORT || 8000;

server.listen(port);
