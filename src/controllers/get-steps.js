const { NotFound } = require("http-errors")

const { getFormattedSteps } = require("../model")
const {} = require("../middleware")

const getSteps = async (req, res, next) => {
    const id = res.locals.userId
    const { requirementsId } = req.params
    try {
        const steps = await getFormattedSteps(requirementsId, id)
        if (!steps.length) throw NotFound("Requirement does not exist")
        res.json(steps)
    } catch (error) {
        next(error)
    }
}

module.exports = [getSteps]
