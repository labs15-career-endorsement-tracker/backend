const jwt = require("jsonwebtoken")

const { jwtSecret } = require("../config")

const generateJwt = (payload, secret = jwtSecret, expiresIn = "1d") => {
    return jwt.sign(payload, secret, { expiresIn })
}

const extractJwt = (token, secret = jwtSecret) => {
    return jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            throw err
        } else {
            return decoded
        }
    })
}
module.exports = { generateJwt, extractJwt }
