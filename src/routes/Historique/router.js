import { Router } from 'express'
import all from './all'
import add from './create'
import del from './delete'

const api = Router()

api.use('/', all)
api.use('/add', add)
api.use('/delete', del)

export default api