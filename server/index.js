import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("ping", (payload) => {
    socket.emit("pong", payload ?? { time: Date.now() });
  });

  socket.on("disconnect", (reason) => {
    console.log("socket disconnected", socket.id, reason);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server listening on ${PORT}`);
});
