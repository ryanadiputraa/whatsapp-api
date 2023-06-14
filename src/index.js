import { waClient, server } from "./app/socket.js"

import { logger } from "./app/logging.js"

waClient.initialize()

// closing using CTRL+C
process.on("SIGINT", async () => {
  logger.info("(SIGINT) Shutting down...")
  await waClient.destroy()
  logger.info("client destroyed")
  process.exit(0)
})

server.listen(8080, () => {
  logger.info("web server start")
})
