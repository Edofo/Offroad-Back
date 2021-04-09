import { Router } from 'express'
import prisma from '../../db'
import { isEmpty } from 'lodash'
import NodeGeocoder from 'node-geocoder'

const api = Router()

api.post('/', async (req, res) => {
    try {

        const acceptedFields = ['level', 'adress', "infos"]

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { level, adress, infos } = req.body

        const options = {
            provider: 'google',
           
            apiKey: process.env.GOOGLE_API_KEY,
            formatter: null
        };
        
        const geocoder = NodeGeocoder(options);
        
        const res = await geocoder.geocode('29 champs elysée paris');

        console.log(res)

        const spot = await prisma.spot.create({
            data: {
                level,
                adress,
                infos,
                lat: '',
                lng: '',
                note: 2,
            }
        })

        res.json({ data: { spot } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api