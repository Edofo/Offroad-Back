import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.delete('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)

        const prisma = new PrismaClient()

        const historiqueCheck = await prisma.historique.findFirst({
            where: {
                id
            }
        })

        if (!historiqueCheck) {
            return res.status(400).json({ error: `this historique with id: ${id} doesn't exist` })
        }
        
        const historique = await prisma.historique.delete({
            where: {
                id,
            }
        })

        res.json({ data: { historique } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api