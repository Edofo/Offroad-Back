import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const prisma = new PrismaClient()
    try {
        const user = await prisma.user.findMany({
            where: {
                id
            }
        })

        res.json({ data: { user } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api