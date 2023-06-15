import { encryptString } from "../app/crypto.js"
import { prismaClient } from "../app/database.js"

export const save = async (clientInfo) => {
  const number = encryptString(clientInfo.number, process.env.CRYPTO_KEY)
  clientInfo.number = number

  await prismaClient.client.upsert({
    create: clientInfo,
    where: { number: number },
    update: { name: clientInfo.name },
  })
}

export const getInfo = async () => await prismaClient.client.findFirst()
