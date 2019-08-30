const db = require("../../data")

// Get steps from the user_steps_completed table either by user_id or steps_id
const findCompletedStepsBy = filter => db("user_steps_completed").where(filter)

const findCompletedRequirementStepsByUser = userId => {
    return db("users as u")
        .join("tracks as tr", "u.tracks_id", "tr.id")
        .join("tasks_tracks as ta_tr", "tr.id", "ta_tr.tracks_id")
        .join("tasks as ta", "ta_tr.tasks_id", "ta.id")
        .join("steps as st", "st.tasks_id", "ta.id")
        .join("user_steps_completed as u_s_c", "st.id", "u_s_c.steps_id")
        .where({ is_endorsement_requirement: true })
        .andWhere({ "u_s_c.user_id": userId })
}

const markComplete = (userId, stepId) =>
    db("user_steps_completed")
        .insert({ user_id: userId, steps_id: stepId })
        .returning(["id"])

const markIncomplete = (userId, stepId) =>
    db("user_steps_completed")
        .where({ user_id: userId, steps_id: stepId })
        .del()
module.exports = {
    findCompletedStepsBy,
    markComplete,
    markIncomplete,
    findCompletedRequirementStepsByUser
}
