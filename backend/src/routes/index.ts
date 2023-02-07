import { Router } from 'express'

const routes = Router()

import { usersRouter } from './users.routes'

routes.use('/users', usersRouter)

export { routes }
