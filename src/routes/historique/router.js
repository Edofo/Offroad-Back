import { Router } from 'express'
import all from './all'
import unique from './allunique'
import add from './create'
import del from './delete'

const api = Router()

api.use('/', all)
api.use('/unique', unique)
api.use('/add', add)
api.use('/delete', del)

export default api