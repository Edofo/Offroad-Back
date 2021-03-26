import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.delete('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)

        const prisma = new PrismaClient()
    
        const reportspot = await prisma.reportspot.delete({
            where: {
                id,
            }
        })

        res.json({ data: { reportspot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api