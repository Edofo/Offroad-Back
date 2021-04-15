import { Router } from 'express'
import profil from './profil'
import edit from './edit'
import editMedic from './editMedic'

const api = Router()

api.use('/', profil)
api.use('/edit', edit)
api.use('/edit/medic', editMedic)

export default api