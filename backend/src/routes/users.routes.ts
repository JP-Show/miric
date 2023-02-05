import { Router } from 'express'

import { UsersControllers } from '../controllers/UsersControllers'

const usersControllers = new UsersControllers()

const usersRouter = Router()

usersRouter.post('/create', usersControllers.create)

export { usersRouter }
