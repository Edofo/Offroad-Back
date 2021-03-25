import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.get('/:id', async (req, res) => {
    try {
        const authorId = parseInt(req.params.id)

        const prisma = new PrismaClient()

        const like = await prisma.like.findMany({
            where: {
                authorId
            }
        })

        res.json({ data: { like } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api