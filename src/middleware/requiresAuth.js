const { Unauthorized } = require("http-errors")

const { extractJwt } = require("../utils")
const { emailConfig } = require("../config")

const requiresAuth = (req, res, next) => {
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1].trim()
        : null
    const error401 = Unauthorized(`Bad or no token`)
    try {
        const { userId, isAdmin } = extractJwt(token)
        res.locals.userId = userId
        res.locals.isAdmin = isAdmin
        next()
    } catch (error) {
        try {
            const { userId, isAdmin } = extractJwt(token, emailConfig.secret)
            res.locals.userId = userId
            res.locals.isAdmin = isAdmin
            next()
        } catch (error) {
            next(error401)
        }
        // next(error)
    }
}
module.exports = requiresAuth
