import whatsappWeb from "whatsapp-web.js"
import qrCode from "qrcode-terminal"
import { Server } from "socket.io"
import http from "http"

import { logger } from "./logging.js"
import { web } from "./web.js"
const { Client, LocalAuth } = whatsappWeb

const client = new Client({
  authStrategy: new LocalAuth(),
})
const server = http.createServer(web)
const socket = new Server(server, {
  cors: { origin: process.env.WEB_URL },
})

client.on("qr", (qr) => {
  qrCode.generate(qr, { small: true })
})

client.on("ready", () => {
  logger.info("client connected")
})

export { client }
