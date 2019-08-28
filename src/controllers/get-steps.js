const {} = require("http-errors")

const {
    findCompletedStepsBy,
    findStepsByTask,
    getFormattedSteps
} = require("../model")
const {} = require("../middleware")

const getSteps = async (req, res, next) => {
    const id = res.locals.userId
    const { requirementsId } = req.params
    try {
        const steps = await getFormattedSteps(requirementsId, id)
        res.json(steps)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = [getSteps]
