import { Router } from 'express'

const routes = Router()

import { usersRouter } from './users.routes'
import { mediaRouter } from './media.routes'
import { sessionRouter } from './session.routes'

routes.use('/users', usersRouter)
routes.use('/media', mediaRouter)
routes.use('/session', sessionRouter)

export { routes }
