const db = require("../../data")

// get completed steps for a specific task for a specific user
const findCompletedStepsForTaskByUser = (userId, taskId) => {
    return db("user_steps_completed as u_s_c")
        .join("steps as s", "s.id", "u_s_c.steps_id")
        .join("tasks as t", "s.tasks_id", "t.id")
        .where("t.id", taskId)
        .andWhere("u_s_c.user_id", userId)
        .select(
            "u_s_c.user_id",
            "u_s_c.id",
            "u_s_c.created_at",
            "u_s_c.steps_id",
            "s.is_required",
            "s.number",
            "s.steps_description",
            "s.tasks_id"
        )
    // .distinct("u_s_c.user_id", "u_s_c.steps_id")
}

// Get steps from the user_steps_completed table either by user_id or steps_id
const findCompletedStepsBy = filter => db("user_steps_completed").where(filter)

// Get all the completed steps for JUST ENDORSEMENT REQUIREMENTS
const findCompletedRequirementStepsByUser = userId => {
    return db("users as u")
        .join("tracks as tr", "u.tracks_id", "tr.id")
        .join("tasks_tracks as ta_tr", "tr.id", "ta_tr.tracks_id")
        .join("tasks as ta", "ta_tr.tasks_id", "ta.id")
        .join("steps as st", "st.tasks_id", "ta_tr.tasks_id")
        .join("user_steps_completed as u_s_c", "st.id", "u_s_c.steps_id")
        .where({ is_endorsement_requirement: true })
        .andWhere({ "u_s_c.user_id": userId })
        .select(
            "u_s_c.id",
            "u_s_c.steps_id",
            "u_s_c.user_id",
            "u_s_c.created_at"
        )
        .distinct("u_s_c.user_id", "u_s_c.steps_id")
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
    findCompletedRequirementStepsByUser,
    findCompletedStepsForTaskByUser
}
