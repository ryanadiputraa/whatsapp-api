import { prismaClient } from "../app/database.js"

export const save = async (chat) => {
  const chatId = chat.fromMe ? chat.to : chat.from

  const chatsCount = await prismaClient.chats.count({
    where: {
      chatId: chatId,
    },
  })

  if (chatsCount < 1) {
    await prismaClient.chats.create({
      data: {
        chatId: chatId,
      },
    })
  }

  await prismaClient.chat.create({
    data: {
      chatId: chatId,
      ...chat,
    },
  })
}
