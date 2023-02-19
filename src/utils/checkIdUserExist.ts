import { Request, Response } from 'express'
import { prisma } from '../services/prismaClient'
import { ApiError } from '../helpers/api-error'

export async function checkIdUserExist(req: Request, res: Response) {
  const id_users = req.user.id

  const userExist = await prisma.users.findFirst({
    where: {
      id: Number(id_users)
    }
  })

  if (!userExist) {
    throw new ApiError('id user not exist', 404)
  }
}
