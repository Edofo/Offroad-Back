import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { isEmpty } from 'lodash'

const api = Router()

api.patch('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)

        const acceptedFields = ['level', 'adress', "infos"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { level, adress, infos } = req.body

        const prisma = new PrismaClient()
    
        const spot = await prisma.spot.findFirst({
            where: {
                id
            }
        })

        const updateSpot = await prisma.spot.update({
            where: {
                id
            },
            data: {
                level,
                adress,
                infos
            }
        })

        res.json({ data: { spot, updateSpot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api