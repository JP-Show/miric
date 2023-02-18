import { Router } from 'express'

import { MediaControllers } from '../controllers/MediaControllers'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const mediaControllers = new MediaControllers()

const mediaRouter = Router()

mediaRouter.post('/', ensureAuthenticated, mediaControllers.create)

export { mediaRouter }
