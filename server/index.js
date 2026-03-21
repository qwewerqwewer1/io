import http from "http";
import express from "express";
import { Server } from "socket.io";
// import cors from "cors";

const PORT = 3000;

const app = express();
let HTTP_SERVER_EXPRESS = http.createServer(app);

// даем добро фронту слушать сервер
const io = new Server(HTTP_SERVER_EXPRESS, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("test");
});
let c = 1;
io.on("connection", (socketFromServer) => {
  console.log(c++);
  socketFromServer.emit("emitPort", PORT);
});

// слушатель для порта //
HTTP_SERVER_EXPRESS.listen(PORT, "0.0.0.0", () => {
  console.log(`http://localhost:${PORT}/`);
});
