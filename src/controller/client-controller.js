import { logger } from "../app/logging.js"
import { getInfo } from "../service/client-service.js"

export const clientController = async (socket) => {
  try {
    const clientInfo = await getInfo()
    socket.emit("client", clientInfo)
  } catch (error) {
    logger.error("fail to save client info: ", err)
  }
}
