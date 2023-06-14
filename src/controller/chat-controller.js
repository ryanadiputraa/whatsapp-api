export const chatController = (waClient, socket) => {
  waClient.on("message_create", (message) => {
    const chat = message
    delete chat["_data"]
    delete chat["mediaKey"]
    delete chat["id"]

    // TODO: call save message service
    socket.emit("message", message)
  })
}
