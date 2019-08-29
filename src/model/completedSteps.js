const db = require("../../data")

const markComplete = (userId, stepId) =>
    db("user_steps_completed")
        .insert({ user_id: userId, steps_id: stepId })
        .returning(["id"])

const markIncomplete = (userId, stepId) =>
    db("user_steps_completed")
        .where({ user_id: userId, steps_id: stepId })
        .del()
module.exports = { markComplete, markIncomplete }
