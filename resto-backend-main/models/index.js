const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = require('../config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
sequelize.sync({ alter: true })
module.exports = sequelize;