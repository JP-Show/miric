import 'express-async-errors'
import express, { Request, Response } from 'express'

import { routes } from './routes'
import { errorMiddleware } from './middlewares/error'

const api = express()
const PORT = 3333

api.use(express.json())

api.use(routes)

api.use(errorMiddleware)

api.listen(PORT, () => {
  console.log('server is running on port ' + PORT)
})
