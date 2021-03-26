import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.delete('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id, 10)

        const prisma = new PrismaClient()

        const likeCheck = await prisma.like.findFirst({
            where: {
                id
            }
        })

        if (!likeCheck) {
            return res.status(400).json({ error: `this like with id: ${id} doesn't exist` })
        }

        const like = await prisma.like.delete({
            where: {
                id
            }
        })

        res.json({ data: { like } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api