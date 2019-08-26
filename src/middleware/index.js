const { NotFound } = require("http-errors")
const handle404 = (req, _res, next) => {
    const { method, path } = req
    const msg = `${method} ${path} has not been implemented.`
    next(NotFound(msg))
}

const handle500 = ({ status = 500, name, message }, _req, res, next) => {
    if (res.headersSent) return next()
    res.status(status).json({ name, statusCode: status, message })
}

const checkEmailPasswordExist = (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({
            message: "Please enter your email and password"
        })
    } else {
        next()
    }
}

module.exports = {
    handle404,
    handle500,
    checkEmailPasswordExist
}
