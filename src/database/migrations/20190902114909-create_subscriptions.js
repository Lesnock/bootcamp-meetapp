
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('subscriptions', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        meetup_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'meetups', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    }),

    down: (queryInterface) => queryInterface.dropTable('subscriptions'),
}
