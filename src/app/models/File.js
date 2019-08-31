import Sequelize from 'sequelize'

class File extends Sequelize.Model {
    static init (sequelize) {
        super.init({
            // Attributes
            filename: Sequelize.STRING,
            path: Sequelize.STRING,
            //
        },
        { sequelize })

        return this
    }
}

export default File
