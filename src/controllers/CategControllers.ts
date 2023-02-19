import { prisma } from '../services/prismaClient'
import { Request, Response } from 'express'
import { checkIdUserExist } from '../utils/checkIdUserExist'

export class CategControllers {
  async index(req: Request, res: Response) {
    const id_user = req.user.id
    checkIdUserExist

    const allCateg = await prisma.category.findMany({
      where: {
        id_users: Number(id_user)
      },
      orderBy: {
        name: 'asc'
      }
    })
    console.log(allCateg)
    res.json(allCateg)
  }
}
