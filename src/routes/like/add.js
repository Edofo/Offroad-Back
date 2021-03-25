import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const api = Router()

api.patch('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)

        const prisma = new PrismaClient()
        const like = await prisma.like.findFirst({
            where: {
                id
            }
        })

        const updateTasks = await prisma.task.update({
            where: {
                id
            },
            data: {
                isComplete: task.isComplete ? false : true,
            }
        })

        res.json({ data: { updateTasks } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api