import { Router } from 'express'
import all from './all'
import check from './checkUser'
import add from './add'
import del from './delete'

const api = Router()

api.use('/', all)
api.use('/check', check)
api.use('/add', add)
api.use('/delete', del)

export default api