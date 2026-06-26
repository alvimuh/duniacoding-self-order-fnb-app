"use client";

import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("[socket] connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("[socket] connect_error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.warn("[socket] disconnected:", reason);
});
