import { Router } from 'express'
import prisma from '../../db'

const api = Router()

api.get('/:id/:spotId', async (req, res) => {
    try {
        const authorId = parseInt(req.params.id)
        const spotId = parseInt(req.params.spotId)

        const like = await prisma.like.findMany({
            where: {
                authorId,
                spotId
            }
        })

        res.json({ data: { like } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api