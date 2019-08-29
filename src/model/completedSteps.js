const db = require("../../data")

// Get steps from the user_steps_completed table either by user_id or steps_id
const findCompletedStepsBy = filter => db("user_steps_completed").where(filter)

const markComplete = (userId, stepId) =>
    db("user_steps_completed")
        .insert({ user_id: userId, steps_id: stepId })
        .returning(["id"])

const markIncomplete = (userId, stepId) =>
    db("user_steps_completed")
        .where({ user_id: userId, steps_id: stepId })
        .del()
module.exports = { findCompletedStepsBy, markComplete, markIncomplete }
