import { getInfo } from "../service/client-service.js"

export const clientController = async (waClient, socket) => {
  const clientInfo = await getInfo()
  socket.emit("client", clientInfo)
}
