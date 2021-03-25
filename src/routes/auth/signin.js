import { Router } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import passport from 'passport'


const api = Router()

api.post('/', (req, res) => {
  try {
    const login = passport.authenticate('local', { session: false }, (err, user) => {
      if (err) {
        return res.status(400).json({ error: err })
      }
  
      const { pseudo, email, id, level } = user
      const payload = { pseudo, email, id, level }
      dotenv.config()
      const token = jwt.sign(payload, process.env.JWT_ENCRYPTION)
      res.json({ data: { user, token } })
    })
  
    login(req, res)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default api