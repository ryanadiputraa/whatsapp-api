import { logger } from "../app/logging.js"
import { getClientInfo } from "../service/client-service.js"

export const clientController = async (waClient, io) => {
  try {
    const clientInfo = await getClientInfo()
    io.on("connection", async (socket) => {
      socket.emit("client", clientInfo)
    })
  } catch (error) {
    logger.error("fail to save client info: ", error)
  }
}
