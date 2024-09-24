import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { username, content } = await readBody(event)

  let user = await prisma.user.findUnique({ where: { username } })

  // Create the user if they don't exist
  if (!user) {
    user = await prisma.user.create({
      data: { username },
    })
  }

  // Create the note
  const note = await prisma.note.create({
    data: {
      content,
      userId: user.id,
    },
  })

  return { statusCode: 200, body: note }
})
