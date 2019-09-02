import Sequelize from 'sequelize'

class Subscription extends Sequelize.Model {
    static init (sequelize) {
        super.init({}, { sequelize })

        return this
    }

    static associate (models) {
        this.belongsTo(models.Meetup, { foreignKey: 'meetup_id' })
        this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
}

export default Subscription
