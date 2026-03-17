// подключаем модуль Node, который умеет создавать HTTP сервер
import http from "http";
// подключаем фреймворк для обработки HTTP запросов
import express from "express";
// вытаскиваем класс Сокет ИО для сигналинга
import { Server } from "socket.io";

// порт, на котором будет работать сервер
const myLocalPort = 3000;

// создаём приложение Express (обработчик HTTP запросов)
const ReqAndRes = express();

// создаём настоящий HTTP сервер и передаём в него Express
const httpWithReqAndResServer = http.createServer(ReqAndRes);

const io = new Server(httpWithReqAndResServer, {
  cors: {
    // origin: "http://localhost:5173", // Разрешаем подключения с Vite
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ТЕПЕРЬ МОЖНО РАБОТАТЬ С СОКЕТАМИ
io.on("connection", (socket) => {
  console.log("Клиент подключился к сокету:", socket.id);

  socket.on("disconnect", () => {
    console.log("Клиент отключился:", socket.id);
  });
});

// запускаем HTTP сервер на указанном порту
httpWithReqAndResServer.listen(myLocalPort, () => {
  console.log(`is UP MAN! on ${myLocalPort}`);
});
/////////////////////////////////////////////////////////////
