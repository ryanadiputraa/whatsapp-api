import { prismaClient } from "../app/database.js"

export const save = async (clientInfo) => {
  await prismaClient.client.create({
    data: clientInfo,
  })
}
