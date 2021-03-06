import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { hashPassword } from '../../utils/password'

const api = Router()

api.patch('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const acceptedFields = ['pseudo', 'email', "password", "passwordConfirmation", "level", "notif", "sang", "allergie", "medicament", "other"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { pseudo, email, password, passwordConfirmation, level, notif, sang, allergie, medicament, other } = req.body

        if (password !== passwordConfirmation) {
            return res.status(400).json({
            error: "Password and confirmation doesn't match"
            })
        }

    
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        })

        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                pseudo,
                email,
                level,
                encryptedPassword: hashPassword(password),
                notif,
                sang,
                allergie,
                medicament,
                other
            }
        })

        const payload = { pseudo, email, id, level }
        dotenv.config()
        const token = jwt.sign(payload, process.env.JWT_ENCRYPTION)

        res.json({ data: { user, updateUser, token } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api