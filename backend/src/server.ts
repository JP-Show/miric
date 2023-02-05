import express from 'express'
import { router } from './routes'

const api = express()
const PORT = 3333

api.use(express.json())

api.use(router)

api.listen(PORT, () => {
  console.log('server is running on port ' + PORT)
})
