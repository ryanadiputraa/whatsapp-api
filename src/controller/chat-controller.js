import { saveChat, fetchAllChat } from "../service/chat-service.js"
import { encryptString } from "../app/crypto.js"
import { logger } from "../app/logging.js"

export const chatController = (waClient, io) => {
  try {
    io.on("connection", async (socket) => {
      const chats = await fetchAllChat()
      socket.emit("chats", chats)
    })
  } catch (error) {
    logger.error("fail to fetch chats: " + error)
  }

  io.on("connection", (socket) => {
    socket.on("send", (data) => {
      waClient.sendMessage(data.chatId ?? "", data.message ?? "")
    })
  })

  waClient.on("message_create", async (message) => {
    try {
      if (message.isStatus) return

      const chat = message
      delete chat["_data"]
      delete chat["mediaKey"]
      delete chat["id"]

      chat.body = encryptString(chat.body, process.env.CRYPTO_KEY)

      io.emit("message", chat)
      await saveChat(chat)
    } catch (error) {
      logger.error("fail to save msg: " + error)
    }
  })
}
