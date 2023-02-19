import { Router } from 'express'

import { MediaControllers } from '../controllers/MediaControllers'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const mediaControllers = new MediaControllers()

const mediaRouter = Router()

mediaRouter.post('/', ensureAuthenticated, mediaControllers.create)
mediaRouter.delete('/:media_id', ensureAuthenticated, mediaControllers.delete)

export { mediaRouter }
