import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.get('/:id', async (req, res) => {
    try {

        const spotId = parseInt(req.params.id)

        const prisma = new PrismaClient()

        const reportpost = await prisma.reportpost.findMany({
            where: {
                postId
            }
        })

        res.json({ data: { reportpost } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api