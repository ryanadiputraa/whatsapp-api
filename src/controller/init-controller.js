import qrCode from "qrcode-terminal"

import { logger } from "../app/logging.js"
import { saveClient } from "../service/client-service.js"

export const initController = (waClient, io) => {
  waClient.on("qr", (qr) => {
    qrCode.generate(qr, { small: true })
  })

  waClient.on("ready", async () => {
    const client = {
      name: waClient.info.pushname ?? "Unset",
      number: waClient.info.me?.user ?? "-",
    }
    logger.info("client connected: ", client)
    await saveClient(client)
  })
}
