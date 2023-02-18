import { verify } from 'jsonwebtoken'
import { jwt } from '../config/auth'
import { Request, Response, NextFunction } from 'express-serve-static-core'
import { ApiError } from '../helpers/api-error'

export function ensureAuthenticated(
  req: Request,
  res: Response,
  nex: NextFunction
) {
  const authHeader = req.headers.authorization //we get baerer token in headers

  if (!authHeader) {
    throw new ApiError('token not informed', 401)
  }
  const [, token] = authHeader.split(' ') // 'berean' '*token*' we get just token without berear

  try {
    const { sub: user_id } = verify(token, jwt.secret)
    req.user = {
      id: Number(user_id)
    }
    return nex()
  } catch {
    throw new ApiError('token invalid', 401)
  }
}
