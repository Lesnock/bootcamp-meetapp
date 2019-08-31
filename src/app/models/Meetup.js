import Sequelize from 'sequelize'

class Meetup extends Sequelize.Model {
    static init (sequelize) {
        super.init({
            // Attributes
            title: Sequelize.STRING,
            description: Sequelize.TEXT,
            address: Sequelize.STRING,
            date: Sequelize.DATE,
            // user
        },
        { sequelize })

        return this
    }

    static associate (models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}

export default Meetup
