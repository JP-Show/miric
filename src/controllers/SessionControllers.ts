import { prisma } from '../services/prismaClient'
import { jwt } from '../config/auth'

import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { ApiError } from '../helpers/api-error'

export class SessionControllers {
  async create(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await prisma.users.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new ApiError('email or password is incorrect', 401)
    }

    const passCompare: Boolean = await compare(password, user.password)
    if (!passCompare) {
      throw new ApiError('email or password is incorrect 2', 401)
    }

    const { secret, expiresIn } = jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })
    

    return res.json({ user, token })
  }
}
