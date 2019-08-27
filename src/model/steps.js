const db = require("../../data")
// Get all the steps for a task
const findStepsByTask = taskId => db("steps").where({ tasks_id: taskId })

// Get steps from the user_steps_completed table either by user_id or steps_id
const findCompletedStepsBy = filter => db("user_steps_completed").where(filter)

module.exports = {
    findCompletedStepsBy,
    findStepsByTask
}
