const {} = require("http-errors")

const { findCompletedStepsBy, findStepsByTask } = require("../model")
const {} = require("../middleware")

const getSteps = async (req, res, next) => {
    const id = res.locals.userId
    const requirementsId = req.params()
    try {
        const steps = await findStepsByTask(requirementsId)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = [getSteps]
