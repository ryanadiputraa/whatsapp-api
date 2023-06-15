export const chatController = (waClient, socket) => {
  // TODO: send chats history

  socket.on("send", (data) => {
    waClient.sendMessage(data.chatId ?? "", data.message ?? "")
  })

  waClient.on("message_create", (message) => {
    const chat = message
    delete chat["_data"]
    delete chat["mediaKey"]
    delete chat["id"]

    // TODO: call save message service
    socket.emit("message", message)
  })
}
