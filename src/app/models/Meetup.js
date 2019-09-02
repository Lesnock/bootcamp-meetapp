import User from './User'
import File from './File'
import Sequelize, { Op } from 'sequelize'
import { parseISO, startOfDay, endOfDay, isBefore } from 'date-fns'

class Meetup extends Sequelize.Model {
    static init (sequelize) {
        super.init({
            // Attributes
            title: Sequelize.STRING,
            description: Sequelize.TEXT,
            address: Sequelize.STRING,
            date: Sequelize.DATE,
            file_id: Sequelize.INTEGER,
            isPast: {
                type: Sequelize.VIRTUAL,
                get () {
                    return isBefore(this.date, new Date())
                },
            },
            // user
        },
        { sequelize })

        return this
    }

    static associate (models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        this.belongsTo(models.File, { foreignKey: 'file_id', as: 'banner' })
    }

    // Find all meetups of a day
    // If date is not specified, will find all meetups
    static getAllWhere ({ date, page = 1, ...params }) {
        const where = { ...params }

        if (date) {
            const searchDate = parseISO(date)

            where.date = { [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)] }
        }

        const registerPerPage = 10

        return Meetup.findAll({
            where,
            attributes: ['id', 'title', 'description', 'address', 'date'],
            limit: registerPerPage,
            offset: (page - 1) * registerPerPage,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'username', 'email'],
                    include: [{
                        model: File,
                        as: 'avatar',
                        attributes: ['id', 'filename', 'url'],
                    }],
                },
                {
                    model: File,
                    as: 'banner',
                    attributes: ['id', 'filename', 'url'],
                },
            ],
        })
    }
}

export default Meetup
