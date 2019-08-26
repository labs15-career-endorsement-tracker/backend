const db = require("../../data")

const findUsers = () => db("users")

const findUsersBy = filter => db("users").where(filter)

const findStepsByTask = taskId => db("steps").where({ tasks_id: taskId })

const findCompletedStepsBy = filter => db("user_steps_completed").where(filter)

const findTasksByTrack = async (trackId, userId) => {
    let userCompletedSteps = await findCompletedStepsBy({
        user_id: userId
    }).map(el => el.steps_id)
    console.log(userCompletedSteps)
    const allRequirements = await db("tasks_tracks")
        .join("tasks", "tasks.id", "tasks_tracks.tasks_id")
        .where({ tracks_id: trackId })
        .andWhere({ is_endorsement_requirement: true })
    const allRequirementsWithSteps = await Promise.all(
        allRequirements.map(async el => {
            const steps = await findStepsByTask(el.tasks_id)

            return { ...el, steps: [...steps] }
        })
    )
    console.log(1, allRequirementsWithSteps)
    return allRequirements
}

module.exports = { findUsers, findUsersBy, findTasksByTrack }
