import bcrypt from 'bcryptjs'
import Sequelize from 'sequelize'

class User extends Sequelize.Model {
    static init (sequelize) {
        super.init({
            // Attributes
            name: Sequelize.STRING,
            username: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            //
        },
        { sequelize })

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        })
    }

    static async hasEmail (email) {
        return !!await User.findOne({ where: { email } })
    }

    static async hasUsername (username) {
        return !!await User.findOne({ where: { username } })
    }

    checkPassword (password) {
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User
