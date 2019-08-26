const { handle404, handle500 } = require("./error-handlers")
const { validateEmail, validatePassword } = require("./validators")
const restricted = require("./auth")

module.exports = {
    handle404,
    handle500,
    validateEmail,
    validatePassword,
    restricted
}
