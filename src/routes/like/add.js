import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.patch('/', async (req, res) => {
    try {
        const acceptedFields = ['spotId', 'authorId']

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { spotId, authorId } = req.body

        const prisma = new PrismaClient()
    
        const like = await prisma.like.create({
            data: {
                spotId,
                authorId
            }
        })

        res.json({ data: { like } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api