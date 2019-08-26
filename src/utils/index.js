const jwt = require("jsonwebtoken")

const { jwtSecret } = require("../config")

const generateJwt = payload => {
    return jwt.sign(payload, jwtSecret, { expiresIn: "1d" })
}

module.exports = { generateJwt }
