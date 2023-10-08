const dotenv = require('dotenv')
dotenv.config();
const { APP_PORT, DEBUG_MODE, DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_DIALECT, JWT_SECRET } = process.env

module.exports = {
    DEBUG_MODE, APP_PORT, DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_DIALECT, JWT_SECRET
}
