import { Router } from 'express'
import profil from './profil'
import edit from './edit'

const api = Router()

api.use('/', profil)
api.use('/edit', edit)

export default api