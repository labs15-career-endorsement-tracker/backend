const { calendlyUpdate } = require("../model")

const { validatePassword } = require("../middleware")

const updateCalendly = async (req, res, next) => {
    const { password } = req.body
    const id = res.locals.userId

    try {
        await calendlyUpdate(id, { password })
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
}

module.exports = [validatePassword, updateCalendly]
