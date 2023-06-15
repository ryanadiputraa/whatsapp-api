import { prismaClient } from "../app/database.js"

export const save = async (clientInfo) => {
  await prismaClient.client.upsert({
    create: clientInfo,
    where: { number: clientInfo.number },
    update: { name: clientInfo.name },
  })
}

export const getInfo = async () => await prismaClient.client.findFirst()
