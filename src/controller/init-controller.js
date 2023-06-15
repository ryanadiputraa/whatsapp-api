import qrCode from "qrcode-terminal"

import { logger } from "../app/logging.js"

export const initController = (waClient, socket) => {
  waClient.on("qr", (qr) => {
    qrCode.generate(qr, { small: true })
  })

  waClient.on("ready", () => {
    const client = {
      name: waClient.info.pushname ?? "Unset",
      number: waClient.info.me?.user ?? "-",
    }
    logger.info("client connected: ", client)
    // TODO: call save/update client info service
  })
}
