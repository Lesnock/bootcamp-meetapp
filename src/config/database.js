require('dotenv/config')

module.exports = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
}