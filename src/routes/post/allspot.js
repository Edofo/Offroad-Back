import { Router } from 'express'
import prisma from '../../db'

const api = Router()

api.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        let data = [];

        const post = await prisma.post.findMany({
            where: {
                spotId: id
            }
        }).then(async(response) => {

            const user = await prisma.user.findMany({
                where: {
                    id: response.id
                }
            })

            res.json({ data: { post, user } })
        })

        
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api