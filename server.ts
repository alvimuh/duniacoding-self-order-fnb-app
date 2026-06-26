import { createServer } from "node:http";
import next from "next";
import { initIO } from "@/lib/socket-server";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
 const httpServer = createServer((req, res) => {
 // Let Socket.IO handle its own transport requests — don't pass to Next.js
 if (req.url?.startsWith("/socket.io/")) return;
 handle(req, res);
 });

 initIO(httpServer);

 httpServer
 .once("error", (err) => {
 console.error(err);
 process.exit(1);
 })
 .listen(port, () => {
 console.log(`> Ready on http://${hostname}:${port}`);
 });
});

