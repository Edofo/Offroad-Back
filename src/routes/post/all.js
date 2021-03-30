import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.get('/:id', async (req, res) => {
    try {

        const spotId = parseInt(req.params.id)

        const prisma = new PrismaClient()

        const post = await prisma.post.findMany({
            where: {
                spotId: spotId
            }
        })

        res.json({ data: { post } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api