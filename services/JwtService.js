const { JWT_SECRET } = require("../config");
const jwt = require('jsonwebtoken')

class JwtService {

    static sign(payload, expiry = '1m', secret = JWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }
}

module.exports = JwtService;