import { Router } from 'express'
import prisma from '../../db'

const api = Router()

api.delete('/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id)

    
        const reportspot = await prisma.reportSpot.delete({
            where: {
                id,
            }
        })

        res.json({ data: { reportspot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api