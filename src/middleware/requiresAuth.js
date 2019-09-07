const { Unauthorized } = require("http-errors")

const { extractJwt } = require("../utils")

const requiresAuth = (req, res, next) => {
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1].trim()
        : null
    const error401 = Unauthorized(`Bad or no token`)
    try {
        const userId = extractJwt(token)
        res.locals.userId = userId
        next()
    } catch (error) {
        next(error401)
    }
}
module.exports = requiresAuth
