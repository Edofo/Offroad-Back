import { Router } from 'express'
import signin from './signin'
import signup from './signup'
import forgot from './forgotpwd'

const api = Router()

api.use('/signin', signin)
api.use('/signup', signup)
api.use('/forgot-password', forgot)

export default api