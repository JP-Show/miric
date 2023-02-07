import { AppError } from '../utils/AppError'

import { Users } from '.prisma/client'
import { hash } from 'bcrypt'
import { prisma } from '../services/prismaClient'
import { Request, Response } from 'express-serve-static-core'

export class UsersControllers {
  async create(req: Request, res: Response) {
    const { first_name, last_name, email, avatar, password }: Users = req.body

    const emailExist = await prisma.users.findFirst({
      where: {
        email: email.trim()
      }
    })
    const passwordCript: string = await hash(password, 8)

    if (emailExist) {
      return res.json(new AppError(`email has been used`, 400))
    } else if (first_name == '' || email == '' || password == '') {
      return res.json(new AppError(`missing camp`, 400))
    } else {
      await prisma.users.create({
        data: {
          first_name,
          last_name,
          email,
          avatar,
          password: passwordCript
        }
      })
      return res.send('created')
    }
  }
  async index(req: Request, res: Response) {
    const { id } = req.params
    const idUser: number = +id

    const user = await prisma.users.findFirst({
      where: {
        id: idUser
      }
    })

    if (!user) {
      return res.json(new AppError('user not found', 400))
    }

    return res.send(user)
  }
}
