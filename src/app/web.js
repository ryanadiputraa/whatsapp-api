import exress from "express"
import cors from "cors"

const web = exress()
web.use(
  cors({
    origin: process.env.WEB_URL,
  })
)

export { web }
