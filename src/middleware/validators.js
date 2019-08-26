const { BadRequest } = require("http-errors")
const { check, validationResult } = require("express-validator")

const handleValidationResult = (req, next, fieldName) => {
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return next(BadRequest(result.mapped()[fieldName].msg))
    }
}

const validateEmail = async (req, _res, next) => {
    const fieldName = "email"

    try {
        await check(fieldName)
            .normalizeEmail()
            .isEmail()
            .withMessage(`Missing required key: ${fieldName}`)
            .run(req)
    } catch (error) {
        next(error)
    }

    handleValidationResult(req, next, fieldName)
    next()
}

const validatePassword = async (req, _res, next) => {
    const fieldName = "password"

    try {
        await check(fieldName)
            .isLength({ min: 8, max: 16 })
            .withMessage(`Password must be 8 to 16 characters`)
            .run(req)
    } catch (error) {
        next(error)
    }

    handleValidationResult(req, next, fieldName)
    next()
}

module.exports = { validateEmail, validatePassword }
