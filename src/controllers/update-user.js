const { userUpdate } = require("../model")
const { check, validationResult } = require("express-validator")

const updateUser = async (req, res, next) => {
    const { password, calendly_link } = req.body
    const id = res.locals.userId

    try {
        if (password) {
            await check("password")
                .isLength({ min: 8, max: 255 })
                .withMessage(`Password must be 8 to 16 characters`)
                .run(req)

            const result = validationResult(req)

            if (!result.isEmpty()) {
                return next(BadRequest(result.mapped()["password"].msg))
            }
        }
        if (calendly_link) {
            await check("calendly_link")
                .isURL()
                .withMessage(`Calendly link must be a valid URL`)
                .run(req)

            const result = validationResult(req)

            if (!result.isEmpty()) {
                return next(BadRequest(result.mapped()["calendly_link"].msg))
            }
        }
        const updateData = {}
        if (password) updateData.password = password
        if (calendly_link) updateData.calendly_link = calendly_link
        await userUpdate(id, updateData)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

module.exports = updateUser
