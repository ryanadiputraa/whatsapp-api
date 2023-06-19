import { prismaClient } from "../app/database.js"

export const saveClient = async (clientInfo) => {
  await prismaClient.client.upsert({
    create: clientInfo,
    where: { number: clientInfo.number },
    update: { name: clientInfo.name },
  })
}

export const getClientInfo = async () => await prismaClient.client.findFirst()
