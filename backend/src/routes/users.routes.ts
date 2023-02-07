import { Router } from 'express'

import { UsersControllers } from '../controllers/UsersControllers'

const usersControllers = new UsersControllers()

const usersRouter = Router()

usersRouter.post('/', usersControllers.create)
usersRouter.get('/:id', usersControllers.index)

export { usersRouter }
