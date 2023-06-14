import { waClient } from "./app/socket.js"
import { web } from "./app/web.js"

import { logger } from "./app/logging.js"

waClient.initialize()

web.listen(8080, () => {
  logger.info("web server start")
})
