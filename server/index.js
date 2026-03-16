// подключаем модуль Node, который умеет создавать HTTP сервер
import http from "http";
// подключаем фреймворк для обработки HTTP запросов
import express from "express";

// получаем класс сервера из Socket.IO для будущих WebSocket соединений
import { Server } from "socket.io";

// порт, на котором будет работать сервер
const myLocalPort = 3000;

// создаём приложение Express (обработчик HTTP запросов)
const ReqAndRes = express();

ReqAndRes.use(express.static("../client"));

// создаём настоящий HTTP сервер и передаём в него Express
const httpWithReqAndRes = http.createServer(ReqAndRes);

// создаём WebSocket сервер поверх HTTP LVL2 сервера
const webSocketHttpWithReqAndRes = new Server(httpWithReqAndRes, {
  // разрешаем подключения с любых адресов (удобно для разработки)
  cors: { origin: "*" },
});

// когда браузер делает HTTP запрос на "/" (главная страница)
ReqAndRes.get("/", (req, res) => {
  // отправляем HTML ответ обратно в браузер
  let pathToIndexHtml = "../client/index.html";
  console.log(`test`);
  // res.sendFile(__dirname + pathToIndexHtml);
  //res.sendFile(__dirname + '/index.html');
});

// запускаем HTTP сервер на указанном порту
httpWithReqAndRes.listen(myLocalPort, () => {
  console.log(`is UP MAN! on ${myLocalPort}`);
});
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// слушаем событие подключения нового клиента через WebSocket
webSocketHttpWithReqAndRes.on("connection", (socket) => {
  // socket — это соединение конкретного клиента
  console.log("Новый клиент:", socket.id);

  // слушаем событие отключения этого клиента
  socket.on("disconnect", () => {
    // клиент закрыл вкладку или потерял соединение
    console.log("Клиент отключился:", socket.id);
  });
});
