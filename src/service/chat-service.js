import { prismaClient } from "../app/database.js"

export const saveChat = async (chat) => {
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

export const fetchAllChat = async () => {
  let chats = {}
  const chatsData = await prismaClient.chats.findMany()

  await Promise.all(
    chatsData?.map(async (data) => {
      const chatId = data.chatId
      const chatData = await prismaClient.chat.findMany({
        where: {
          OR: [{ from: chatId }, { to: chatId }],
        },
      })

      chats[chatId] = chatData
    })
  )

  return chats
}
