<template>
  <div>
    <h2>🎤 Голосовой чат</h2>
    <p>
      Статус:
      <span :style="{ color: connected ? 'green' : 'red' }">
        {{ connected ? "🟢 Подключено" : "🔴 Отключено" }}
      </span>
    </p>
    <p v-if="connected && socketId">ID: {{ socketId }}</p>

    <button @click="testConnection">🧪 Тест</button>
    <button @click="forceReconnect">🔄 Переподключиться</button>
  </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
  data() {
    return {
      isConnected: false,
      connected: false,
      socketId: "",
      socket: null,
    };
  },

  mounted() {
    console.log("🔌 Монтируем...");
    this.connectSocket();
  },

  unmounted() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },

  methods: {
    connectSocket() {
      if (this.socket) {
        this.socket.disconnect();
      }

      this.socket = io("http://localhost:3000");

      this.isConnected ? "disconnect" : "connect";

      this.socket.on("connect", () => {
        console.log("✅ Подключено!");
        this.connected = true;
        this.socketId = this.socket.id;
      });

      this.socket.on("disconnect", () => {
        console.log("❌ Отключено");
        this.connected = false;
        this.socketId = "";
      });
    },

    testConnection() {
      const testSocket = io("http://localhost:3000", { forceNew: true });
      testSocket.on("connect", () => {
        alert(`✅ Тест: ${testSocket.id}`);
        testSocket.disconnect();
      });
    },

    forceReconnect() {
      this.connectSocket();
      console.log("✅ forceReconnect успешно выполнен");
    },
  },
};
</script>
