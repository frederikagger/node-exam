const app = require("./app");
const server = require("http").createServer(app);
const io = require("./io")(server)


io.use((socket, next) => {
  console.log(socket.id);
  next();
});

io.on("connection", async (socket) => {
  console.log("client connected");
  socket.on("chat message", ({ message }) => {
    console.log(message);
    io.emit("server emit", { message });
  });
});

const port = process.env.PORT || 8000;

server.listen(port);
