import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { isEmpty } from 'lodash'

const api = Router()

api.post('/', async (req, res) => {
    const acceptedFields = ['level', 'adress', "infos"]

    const missingValues = acceptedFields.filter(field => !req.body[field])
    if (!isEmpty(missingValues)) {
        return res.status(400).json({
        error: `Values ${missingValues.join(', ')} are missing`
        })
    }

    const { level, adress, infos } = req.body

    const prisma = new PrismaClient()

    try {
    
        const spot = await prisma.spot.create({
            data: {
                level,
                adress,
                infos
            }
        })

        res.json({ data: { spot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api