import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.get('/:id', async (req, res) => {
    const spotId = parseInt(req.params.id)

    const prisma = new PrismaClient()

    try {
        const report = await prisma.report.findMany({
            where: {
                spotId
            }
        })

        res.json({ data: { report } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api