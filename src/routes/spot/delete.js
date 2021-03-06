import { Router } from 'express'
import prisma from '../../db'

const api = Router()

api.delete('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)

    
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