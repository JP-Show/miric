import { Router } from 'express'
import { SessionControllers } from '../controllers/SessionControllers'

const sessionRouter = Router()

const sessionControllers = new SessionControllers()

sessionRouter.post('/', sessionControllers.create)

export { sessionRouter }
