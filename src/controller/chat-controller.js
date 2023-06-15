import { save } from "../service/chat-service.js"
import { encryptString } from "../app/crypto.js"
import { logger } from "../app/logging.js"

export const chatController = (waClient, socket) => {
  // TODO: send chats history

  socket.on("send", (data) => {
    waClient.sendMessage(data.chatId ?? "", data.message ?? "")
  })

  waClient.on("message_create", async (message) => {
    try {
      const chat = message
      delete chat["_data"]
      delete chat["mediaKey"]
      delete chat["id"]

      chat.body = encryptString(chat.body, process.env.CRYPTO_KEY)

      console.log(chat)

      socket.emit("message", chat)
      await save(chat)
    } catch (error) {
      logger.error("fail to save msg: " + err)
    }
  })
}
