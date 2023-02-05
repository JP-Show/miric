import { Users } from '.prisma/client'
import { prisma } from '../services/prismaClient'
import { Request, Response } from 'express-serve-static-core'

export class UsersControllers {
  async create(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, avatar, password }: Users = req.body
      await prisma.users.create({
        data: {
          first_name,
          last_name,
          email,
          avatar,
          password
        }
      })
      res.json('created')
    } catch (err) {
      console.log('deu ruim ' + err)
    }
  }
}
