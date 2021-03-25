import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { isEmpty } from 'lodash'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { hashPassword } from '../../utils/password'

const api = Router()

api.post('/', async (req, res) => {

  const acceptedFields = ['pseudo', 'email', 'level', 'password', 'passwordConfirmation']

  const missingValues = acceptedFields.filter(field => !req.body[field])
  if (!isEmpty(missingValues)) {
    return res.status(400).json({
      error: `Values ${missingValues.join(', ')} are missing`
    })
  }

  const { pseudo, email, level, password, passwordConfirmation } = req.body

  if (password !== passwordConfirmation) {
    return res.status(400).json({
      error: "Password and confirmation doesn't match"
    })
  }

  const prisma = new PrismaClient()
  try {
    const user = await prisma.user.create({
      data: {
        pseudo,
        email,
        level,
        encryptedPassword: hashPassword(password),
      }
    })

    const payload = { pseudo, email, id, level }
    dotenv.config()
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION)

    res.json({ data: { user, token } })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default api