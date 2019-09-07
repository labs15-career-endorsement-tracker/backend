const jwt = require("jsonwebtoken")

const { jwtSecret } = require("../config")

const generateJwt = payload => {
    return jwt.sign(payload, jwtSecret, { expiresIn: "1d" })
}
const extractJwt = token => {
    return jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            throw err
        } else {
            return decoded
        }
    })
}
module.exports = { generateJwt, extractJwt }
