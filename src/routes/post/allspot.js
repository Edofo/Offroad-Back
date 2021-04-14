import { Router } from 'express'
import prisma from '../../db'

const api = Router()

api.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)


        const post = await prisma.post.findMany({
            where: {
                spotId: id
            }
        })

        res.json({ data: { post } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api