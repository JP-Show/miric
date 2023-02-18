import { Users } from '.prisma/client'
import { hash } from 'bcrypt'
import { prisma } from '../services/prismaClient'
import { Request, Response } from 'express'
import { ApiError } from '../helpers/api-error'

export class UsersControllers {
  async create(req: Request, res: Response) {
    const { first_name, last_name, email, avatar, password }: Users = req.body

    const emailExist = await prisma.users.findFirst({
      where: {
        email: email.trim()
      }
    })
    const passwordCrypt: string = await hash(password, 8)

    if (emailExist) {
      throw new Error('email has been used')
    } else if (first_name == '' || email == '' || password == '') {
      throw new Error('missing camp')
    } else {
      await prisma.users.create({
        data: {
          first_name,
          last_name,
          email,
          avatar,
          password: passwordCrypt
        }
      })
      return res.json('user has been created')
    }
  }
  async index(req: Request, res: Response) {
    const id: number = req.user.id ?? 0

    const user = await prisma.users.findFirst({
      where: {
        id: Number(id)
      }
    })
    if (!user) {
      throw new ApiError('user not found', 404)
    }

    return res.json(user)
  }
}
