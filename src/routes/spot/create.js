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

        var googleMapsClient = require('@google/maps').createClient({
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        });
        
        googleMapsClient.geocode({address: adress})
        .asPromise()
        .then((response) => {
            console.log('OK')
            console.log(response.json.results);
        })
        .catch((err) => {
            console.log(err);
        });

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