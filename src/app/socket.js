import { Client } from "whatsapp-web.js"

export const client = new Client({})

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr)
})

client.on("ready", () => {
  console.log("Client is ready!")
})
