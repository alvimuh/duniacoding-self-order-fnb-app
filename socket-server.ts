import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";

declare global {
  // eslint-disable-next-line no-var
  var __io: SocketIOServer | undefined;
}

export function getIO(): SocketIOServer | undefined {
  return globalThis.__io;
}

export function initIO(httpServer: NetServer): SocketIOServer {
  const io = new SocketIOServer(httpServer);

  io.on("connection", (socket) => {
    console.log(`[socket.io] client connected: ${socket.id}`);

    socket.on("disconnect", (reason) => {
      console.log(`[socket.io] client disconnected: ${socket.id} (${reason})`);
    });
  });

  globalThis.__io = io;
  return io;
}
