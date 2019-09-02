import { Op } from 'sequelize'
import message from '../messages'
import Meetup from '../models/Meetup'
import Subscription from '../models/Subscription'

class SubscriptionController {
    async index (req, res) {
        const subs = await Subscription.findAll({
            where: { user_id: req.userId },
            include: [{
                model: Meetup,
                where: { date: { [Op.gt]: new Date() } },
            }],
            order: [[Meetup, 'date']],
        })

        return res.json(subs)
    }

    async store (req, res) {
        const { meetupId } = req.params

        const meetup = await Meetup.findByPk(meetupId)

        if (!meetup) {
            return res.status(400).json({ error: message('meetup-not-found') })
        }

        if (meetup.isPast) {
            return res.status(403).json({ error: message('meetup-past') })
        }

        if (meetup.user_id === req.userId) {
            return res.status(403).json({ error: message('subscribe-is-organizer') })
        }

        // User is already subscribed to this meetup
        const isSubscribed = await Subscription.findOne({
            where: {
                meetup_id: meetup.id,
                user_id: req.userId,
            },
        })

        if (isSubscribed) {
            return res.status(400).json({ error: message('already-subscribed') })
        }

        // Check if user has a meetup with same date/hour
        const checkDate = await Subscription.findAll({
            where: { user_id: req.userId },
            include: [{
                model: Meetup,
                where: { date: meetup.date },
            }],
        })

        if (checkDate.length !== 0) {
            return res.status(400).json({ error: message('date-busy') })
        }

        const subscription = await Subscription.create({
            meetup_id: meetupId,
            user_id: req.userId,
        })

        return res.json(subscription)
    }
}

export default new SubscriptionController()
