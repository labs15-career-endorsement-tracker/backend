const db = require("../../data")

const { findCompletedStepsBy } = require("./completedSteps")

// Get all the steps for a task
const findStepsByTask = taskId =>
    db("steps")
        .where({ tasks_id: taskId })
        .orderBy("number")

// Format steps into an array of step objects with completion flag
const getFormattedSteps = async (taskId, userId) => {
    const allSteps = await findStepsByTask(taskId)
    const completedSteps = await findCompletedStepsBy({ user_id: userId })
    // get an array of just the steps_id of the completed steps for easier comparison
    const completedStepsIds = completedSteps.map(step => step.steps_id)
    return allSteps.map(step =>
        completedStepsIds.includes(step.id)
            ? { ...step, is_complete: true }
            : { ...step, is_complete: false }
    )
}

module.exports = {
    findStepsByTask,
    getFormattedSteps
}
