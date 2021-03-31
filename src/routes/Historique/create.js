import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { isEmpty } from 'lodash'
import { convertSpeed, getSpeed } from 'geolib'

const api = Router()

api.post('/', async (req, res) => {
    try {

        const acceptedFields = ['distance', 'temps', 'speed', 'spotId', 'authorId']

        const missingValues = acceptedFields.filter(field => !req.body[field])
        if (!isEmpty(missingValues)) {
            return res.status(400).json({
            error: `Values ${missingValues.join(', ')} are missing`
            })
        }

        const { distance, temps, speed, spotId, authorId } = req.body


        function dateHMS(temps) {
            const addZero = function(v) { return v<10 ? '0' + v : v; };
            const d = new Date(temps * 1000);
            const t = [];
            t.push(addZero(d.getHours())+ 'h');
            t.push(addZero(d.getMinutes())+ 'm');
            return t.join(' ');
        }

        const vMoyen = await Math.floor((distance / temps) * 3.6) + ' km';
        const time = await dateHMS(temps)
        const longueur = await distance + ' km/h';
        const max = await Math.floor(convertSpeed(speed, 'kmh')) + ' km/h';

        const prisma = new PrismaClient()
    
        const historique = await prisma.historique.create({
            data: {
                vMoyen,
                time,
                longueur,
                max,
                spotId: spotId,
                authorId: authorId
            }
        })  

        res.json({ data: { historique } })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default api