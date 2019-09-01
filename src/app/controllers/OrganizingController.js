import Meetup from '../models/Meetup'

class OrganizingController {
    async index (req, res) {
        const { page, date } = req.query

        const meetups = await Meetup.getAllWhere({ page, date, user_id: req.userId })

        return res.json(meetups)
    }
}

export default new OrganizingController()
