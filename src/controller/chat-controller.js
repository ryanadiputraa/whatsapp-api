import { save, fetchAll } from "../service/chat-service.js"
import { encryptString } from "../app/crypto.js"
import { logger } from "../app/logging.js"

export const chatController = async (waClient, socket) => {
  try {
    const chats = await fetchAll()
    socket.emit("chats", chats)
  } catch (error) {
    logger.error("fail to fetch chats: " + error)
  }

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

      socket.emit("message", chat)
      await save(chat)
    } catch (error) {
      logger.error("fail to save msg: " + err)
    }
  })
}
