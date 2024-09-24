import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const notes = await prisma.note.findMany({
    include: { user: true },  // Include the user associated with each note
  })

  return { statusCode: 200, body: notes }
})
