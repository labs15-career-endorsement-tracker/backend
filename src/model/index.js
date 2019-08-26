const db = require("../../data")

const findUsers = () => db("users")

const findUsersBy = filter => db("users").where(filter)

// Get all the steps for a task
const findStepsByTask = taskId => db("steps").where({ tasks_id: taskId })

// Get steps from the user_steps_completed table either by user_id or steps_id
const findCompletedStepsBy = filter => db("user_steps_completed").where(filter)

// get all the requirements (NOTE: REQUIREMENTS NOT INCLUDING ASSIGNMENTS) for a track
const findRequirementsByTrack = trackId =>
    db("tasks_tracks")
        .join("tasks", "tasks.id", "tasks_tracks.tasks_id")
        .where({ tracks_id: trackId })
        .andWhere({ is_endorsement_requirement: true })

const formatRequirementsWithSteps = async (
    allRequirements,
    userCompletedSteps
) => {
    const allRequirementsWithSteps = await Promise.all(
        allRequirements.map(async el => {
            // get all the steps for a given task
            const steps = await findStepsByTask(el.tasks_id)
            // give each step a completed flag
            const stepsWithFlags = steps.map(step =>
                userCompletedSteps.includes(step.id)
                    ? { ...step, completed: true }
                    : { ...step, completed: false }
            )
            // get just the completed steps for this task for progress average
            const justCompletedStepsForThisTask = stepsWithFlags.filter(
                el => el.completed
            )
            // calculate progress
            const progress =
                (justCompletedStepsForThisTask.length / steps.length) * 100
            return { ...el, progress, steps: [...stepsWithFlags] }
        })
    )
    return allRequirementsWithSteps
}

const getRequirementsWithProgress = async (trackId, userId) => {
    // get all the steps a user has completed
    const userCompletedSteps = await findCompletedStepsBy({
        user_id: userId
    }).map(el => el.steps_id)
    // get all the requirements (NOTE: REQUIREMENTS NOT INCLUDING ASSIGNMENTS) for a track
    const allRequirements = await findRequirementsByTrack(trackId)
    // map over each requirement and get its steps. compare with the steps a user has completed to add a completed flag to each step
    const allRequirementsWithSteps = formatRequirementsWithSteps(
        allRequirements,
        userCompletedSteps
    )
    return allRequirementsWithSteps
}

module.exports = { findUsers, findUsersBy, getRequirementsWithProgress }
