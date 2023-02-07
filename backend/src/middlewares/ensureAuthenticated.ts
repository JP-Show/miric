import { verify } from 'jsonwebtoken'
import { AppError } from '../utils/AppError'
import { jwt } from '../config/auth.ts'
import { Request, Response, NextFunction } from 'express-serve-static-core'

export function ensureAuthenticated(
  req: Request,
  res: Response,
  nex: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('token not informed', 401)
  }
  const [, token] = authHeader.split(' ')

  try{
    const {sub: user} = verify(token, jwt.secret)
  }
}
