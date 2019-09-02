import message from '../messages'
import Meetup from '../models/Meetup'
import { isBefore, parseISO } from 'date-fns'
import { MeetupCreateSchema, MeetupUpdateSchema } from '../validations/MeetupValidation'

class MeetupController {
    async index (req, res) {
        const { page, date } = req.query

        // If date is not specified, will get all meetups
        const meetups = await Meetup.getAllWhere({ page, date })

        return res.json(meetups)
    }

    async store (req, res) {
        // Yup validation
        if (!await MeetupCreateSchema.isValid(req.body)) {
            return res.status(400).json({ error: message('validation-fails') })
        }

        // Date past
        if (isBefore(parseISO(req.body.date), new Date())) {
            return res.status(400).json({ error: message('invalid-date') })
        }

        const meetup = await Meetup.create({
            ...req.body,
            user_id: req.userId,
        })

        return res.json(meetup)
    }

    async update (req, res) {
        // Yup validation
        if (!await MeetupUpdateSchema.isValid(req.body)) {
            return res.status(400).json({ error: message('validation-fails') })
        }

        // Date past
        if (isBefore(parseISO(req.body.date), new Date())) {
            return res.status(400).json({ error: message('invalid-date') })
        }

        // Get meetup
        const meetup = await Meetup.findOne({ where: { id: req.params.id } })

        if (!meetup) {
            return res.status(400).json({ error: message('meetup-not-found') })
        }

        // The user is not the organizer of this meetup
        if (meetup.user_id !== req.userId) {
            return res.status(401).json({ error: message('not-authorized') })
        }

        if (meetup.isPast) {
            return res.status(403).json({ error: message('meetup-past') })
        }

        await meetup.update(req.body)

        return res.json(meetup)
    }

    async delete (req, res) {
        const meetup = await Meetup.findOne({ where: { id: req.params.id } })

        if (!meetup) {
            return res.status(400).json({ error: message('meetup-not-found') })
        }

        if (meetup.user_id !== req.userId) {
            return res.status(401).json({ error: message('not-authorized') })
        }

        if (meetup.isPast) {
            return res.status(403).json({ error: message('meetup-past') })
        }

        await meetup.destroy()

        return res.send()
    }
}

export default new MeetupController()
