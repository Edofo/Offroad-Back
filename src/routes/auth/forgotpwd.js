import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import randomstring from 'randomstring'
import sendMail from '../../services/sendMail'
import { hashPassword } from '../../utils/password'

const api = Router()

api.post('/', async (req, res) => {
  try {
    const { email } = req.body
  
    const prisma = new PrismaClient()
    const user = await prisma.user.findFirst({ where: { email } })
  
    if (!user) {
      return res.status(400).json({ error: `User with email ${email} doesn't exist` })
    }
  
    const newPassword = randomstring.generate(7)
  
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        encryptedPassword: hashPassword(newPassword)
      }
    })
  
    await sendMail({ to: email, subject: 'Forgot password', text: `Your new password is ${newPassword}`, html: `<strong>Your new password is ${newPassword}` })
    res.json({ data: { message: 'Email successfully sent' } })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})
  
  export default api