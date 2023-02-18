import { Users } from '@prisma/client'

declare global {
  namespace Express {
    export interface Request {
      user: Partial<Users>
    }
  }
}
//this serve for overwrite Request, because, if use user in req.user it'll error "user it doesn't exist in Express params Request"
