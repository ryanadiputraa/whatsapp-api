import whatsappWeb from "whatsapp-web.js"
import { Server } from "socket.io"
import http from "http"

import { web } from "./web.js"
import { initController } from "../controller/init-controller.js"
import { chatController } from "../controller/chat-controller.js"
import { clientController } from "../controller/client-controller.js"
const { Client, LocalAuth } = whatsappWeb

const waClient = new Client({
  authStrategy: new LocalAuth(),
})
const server = http.createServer(web)
const io = new Server(server, {
  cors: { origin: process.env.WEB_URL },
})

initController(waClient, io)
chatController(waClient, io)
clientController(waClient, io)

export { waClient, server }
