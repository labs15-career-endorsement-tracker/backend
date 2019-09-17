const { Unauthorized } = require("http-errors")

const { validateEmail } = require("../middleware")
const { findUsersBy } = require("../model")
const { sendEmail } = require("../services")
const { generateJwt } = require("../utils")
const { emailConfig } = require("../config")

const configureUrl = (
    payload,
    url = emailConfig.resetPasswordUrl,
    secret = emailConfig.secret
) => {
    const jwt = generateJwt(payload, secret)
    return url + `?token=${jwt}`
}

const resetPassword = async (req, res, next) => {
    const { email } = req.body

    try {
        const [user] = await findUsersBy({ email })

        if (!user) return next(Unauthorized())

        await sendEmail(user.email, {
            ...user,
            resetPasswordUrl: configureUrl({ userId: user.id })
        })

        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

module.exports = [validateEmail, resetPassword]
