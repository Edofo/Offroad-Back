import { Router } from 'express'
import prisma from '../../db'

const api = Router()

api.delete('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)


        const postCheck = await prisma.post.findFirst({
            where: {
                id
            }
        })

        if (!postCheck) {
            return res.status(400).json({ error: `this post with id: ${id} doesn't exist` })
        }
        
        const post = await prisma.post.delete({
            where: {
                id,
            }
        })

        res.json({ data: { post } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api