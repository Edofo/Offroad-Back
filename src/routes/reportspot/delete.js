import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const prisma = new PrismaClient()

    try {
    
        const report = await prisma.report.delete({
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