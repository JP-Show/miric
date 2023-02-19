import { Router } from 'express'

import { UsersControllers } from '../controllers/UsersControllers'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersControllers = new UsersControllers()

const usersRouter = Router()

usersRouter.post('/', usersControllers.create)
usersRouter.get('/', ensureAuthenticated, usersControllers.index)
usersRouter.delete('/', ensureAuthenticated, usersControllers.delete)

export { usersRouter }
