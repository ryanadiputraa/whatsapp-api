import whatsappWeb from "whatsapp-web.js"
import { Server } from "socket.io"
import http from "http"

import { web } from "./web.js"
import { initController } from "../controller/init-controller.js"
import { chatController } from "../controller/chat-controller.js"
import { getInfo } from "../service/client-service.js"
const { Client, LocalAuth } = whatsappWeb

const waClient = new Client({
  authStrategy: new LocalAuth(),
})
const server = http.createServer(web)
const io = new Server(server, {
  cors: { origin: process.env.WEB_URL },
})

initController(waClient, io)
io.on("connection", async (socket) => {
  const clientInfo = await getInfo()
  socket.emit("client", clientInfo)

  chatController(waClient, socket)
})

export { waClient, server }
