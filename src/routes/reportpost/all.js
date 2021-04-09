import { Router } from 'express'
import prisma from '../../db'

const api = Router()

api.get('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)


        const reportpost = await prisma.reportPost.findMany({
            where: {
                id
            }
        })

        res.json({ data: { reportpost } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api