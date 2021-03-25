import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const prisma = new PrismaClient()

    try {
    
        const spot = await prisma.spot.delete({
            where: {
                id,
            }
        })

        res.json({ data: { spot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api