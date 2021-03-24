import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { BAD_REQUEST } from '../constants/api'
import { isEmpty } from 'lodash'

const api = Router()


api.get('/', async (_req, res) => {
    try {
        const prisma = new PrismaClient()
        const tasks = await prisma.task.findMany({
            select: {
                content: true,
                isComplete: true,
                createdAt: true,
                updatedAt: true
            }
        })

        res.json({ data: { tasks } })
    } catch (err) {
        res.status(BAD_REQUEST.status).json({ error: err.message })
    }
})


api.get('/:id', async (_req, res) => {
    try {
        const userId = parseInt(_req.params.id, 10)
    
        const prisma = new PrismaClient()
        const tasks = await prisma.task.findFirst({
            where: {
                userId
            }
        })
    
        if (!tasks) {
            return res.status(BAD_REQUEST.status).json({ error: `Task with User ${userId} doesn't exist` })
        }
    
        const acceptedFields = ['content', 'isComplete']
        let data = {}
        for (const key of acceptedFields) {
            if (_req.body[key]) {
                data[key] = _req.body[key]
            }
        }

        const updateTasks = await prisma.task.findMany({
            where: {
              userId
            }
        })
    
        res.json({ data: { task: updateTasks } })
    } catch (err) {
        res.status(BAD_REQUEST.status).json({ error: err.message })
    }
})


api.post('/add/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10)

        const acceptedFields = ['content']

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { content } = req.body
        const { isComplete } = false

        const prisma = new PrismaClient()
        
        const task = await prisma.task.create({
        data: {
            content,
            userId,
            isComplete,
        }
        })

        res.json({ data: { task } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

api.delete('/delete/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)

        const prisma = new PrismaClient()
        
            const task = await prisma.task.delete({
            where: {
                id,
            }
        })

        res.json({ data: { task } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

api.patch('/edit/:id', async (req, res) => {
    
    try {
        const id = parseInt(req.params.id, 10)

        const prisma = new PrismaClient()
        const task = await prisma.task.findFirst({
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