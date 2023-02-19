import { Router } from 'express'
import { CategControllers } from '../controllers/CategControllers'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const categRouter = Router()
const categControllers = new CategControllers()

categRouter.get('/', ensureAuthenticated, categControllers.index)

export { categRouter }
