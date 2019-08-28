const { Conflict, NotFound, BadRequest } = require("http-errors")

const { markComplete, markIncomplete, getFormattedSteps } = require("../model")

const {} = require("../middleware")

const markSteps = async (req, res, next) => {
    const { is_complete } = req.body
    const { userId } = res.locals
    const { stepsId, requirementsId } = req.params
    try {
        if (typeof is_complete !== Boolean)
            throw BadRequest("is_complete should be boolean")
        if (is_complete) {
            await markIncomplete(userId, stepsId)
        } else {
            await markComplete(userId, stepsId)
        }
        const steps = await getFormattedSteps(requirementsId, userId)
        if (!steps.length) throw NotFound("Requirement does not exist")
        res.json(steps)
    } catch (error) {
        switch (Number(error.code)) {
            case 23505:
                next(Conflict(`Step is already complete`))
                break
            case 23503:
                next(NotFound(`User or step does not exist`))
                break
            default:
                next(error)
        }
    }
}

module.exports = [markSteps]
