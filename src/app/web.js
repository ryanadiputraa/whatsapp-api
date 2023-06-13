import exress from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const web = exress()
web.use(
  cors({
    origin: process.env.WEB_URL,
  })
)

export { web }
