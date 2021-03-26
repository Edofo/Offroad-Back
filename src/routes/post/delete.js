import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.delete('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)

        const prisma = new PrismaClient()

        const postCheck = await prisma.post.findFirst({
            where: {
                id
            }
        })

        if (!postCheck) {
            return res.status(400).json({ error: `this post with id: ${id} doesn't exist` })
        }

        const postCheck = await prisma.like.findFirst({
            where: {
                id
            }
        })

        if (!postCheck) {
            return res.status(400).json({ error: `this like with id: ${id} doesn't exist` })
        }
    
        const post = await prisma.post.delete({
            where: {
                id,
            }
        })

        res.json({ data: { report } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api