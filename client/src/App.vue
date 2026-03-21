<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="fill-height d-flex flex-column justify-center align-center"
      >
        <v-card class="pa-10 text-center" color="transparent" elevation="0">
          <h1>12</h1>
          <p>йцу - {{ msg }}</p>
        </v-card>
      </v-container>
    </v-main>
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
      this.msg = `Порт с сервера: ${data}`;
    });
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  color: #dcdcdc;
  overflow: hidden;
}

/* переливающийся фон */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    #060023,
    #0d0055,
    #1b0040,
    #030000,
    #060023
  );
  background-size: 400% 400%;
  animation: gradientFlow 15s ease infinite;
  z-index: -1;
  filter: blur(40px);
  opacity: 0.9;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
