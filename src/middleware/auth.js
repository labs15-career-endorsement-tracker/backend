const jwt = require("jsonwebtoken")
const { Unauthorized } = require("http-errors")

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    const error401 = Unauthorized(`Incorrect credentials`)

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw error401
        } else {
            req.userId = decoded.userId
            next()
        }
    })
}
module.exports = restricted
