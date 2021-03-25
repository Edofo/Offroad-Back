import { Router } from 'express'
import all from './all'
import create from './create'

const api = Router()

api.use('/', all)
api.use('/add', create)

export default api