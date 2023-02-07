import 'express-async-errors'

import { test } from './test'

import express from 'express'
import { Request, Response } from 'express-serve-static-core'
import { routes } from './routes'
import { AppError } from './utils/AppError'

const api = express()
const PORT = 3333

api.use(express.json())

api.use(routes)

api.use((error: AppError, request: Request, res: Response) => {
  if (error) {
    return res.status(error.statusCode).json({
      status: 'error',
      messager: error.message
    })
  }
  console.log(error)

  return res.json({
    status: 'error',
    messager: error.message
  })
})

test()
api.listen(PORT, () => {
  console.log('server is running on port ' + PORT)
})
