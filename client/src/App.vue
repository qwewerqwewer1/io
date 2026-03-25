<template>
  <v-app>
    <v-container>isPort? - {{ msg }} </v-container>
  </v-app>
</template>

<script>
import { io } from "socket.io-client";

export default {
  data() {
    return {
      msg: "Если строка не изменилась... значит ответ от сервера НЕ ПРИШЕЛ!!",
    };
  },
  mounted() {
    const socketClient = io("http://localhost:3000");
    socketClient.on("emitPort", (data) => {
      console.log(data);
      this.msg = `Порт с сервера: ${data}`;
    });
  },
};
</script>
