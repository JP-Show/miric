import { prisma } from '../services/prismaClient'
import { jwt } from '../config/auth'
import { AppError } from '../utils/AppError'

import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express-serve-static-core'
import { compare } from 'bcrypt'

export class SessionControllers {
  async create(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await prisma.users.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      res.json(new AppError('email or password is incorrect', 403))
    }

    const passCompare = compare(password, user.password)

    if (!passCompare) {
      res.json(new AppError('email or password is incorrect', 403))
    }

    const { secret, expiresIn } = jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })
    return res.json({ user, token })
  }
}
