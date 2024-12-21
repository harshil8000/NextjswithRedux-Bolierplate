import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_API_SERVER;

const socket = io(URL);

socket.on("connect", () => {
  console.log("socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("socket disconnected:", reason);
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
  // else the socket will automatically try to reconnect
});

socket.on("connect_error", (error) => {
  console.log("socket connection error:", error);
});

export { socket };
