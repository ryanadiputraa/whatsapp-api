import qrCode from "qrcode-terminal"

import { logger } from "../app/logging.js"

export const initController = (waClient) => {
  waClient.on("qr", (qr) => {
    qrCode.generate(qr, { small: true })
  })

  waClient.on("ready", () => {
    logger.info("client connected")
  })
}
