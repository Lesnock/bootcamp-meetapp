import Sequelize from 'sequelize'

class File extends Sequelize.Model {
    static init (sequelize) {
        super.init({
            // Attributes
            filename: Sequelize.STRING,
            path: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get () {
                    return `${process.env.APP_URL}/avatars/${this.filename}`
                },
            },
            //
        },
        { sequelize })

        return this
    }
}

export default File
