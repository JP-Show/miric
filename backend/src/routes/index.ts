import { Router } from 'express'

const router = Router()

import { usersRouter } from './users.routes'

router.use('/users', usersRouter)

export { router }
