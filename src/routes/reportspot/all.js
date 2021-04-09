import { Router } from 'express'
import prisma from '../../db'

const api = Router()

api.get('/:id', async (req, res) => {
    try {

        const spotId = parseInt(req.params.id)


        const reportspot = await prisma.reportSpot.findMany({
            where: {
                spotId
            }
        })

        res.json({ data: { reportspot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api