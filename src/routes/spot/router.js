import { Router } from 'express'
import all from './all'
import id from './id'
import create from './create'
import del from './delete'
import update from './edit'

const api = Router()

api.use('/', all)
api.use('/unique', id)
api.use('/add', create)
api.use('/delete', del)
api.use('/edit', update)

export default api