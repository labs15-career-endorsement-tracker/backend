const db = require("../../data")

const { findCompletedStepsForTaskByUser } = require("./completedSteps")
const { findStepsByTask } = require("./steps")
const { findResourcesForRequirement } = require("./resources")

// get progress for individual requirement
const getRequirementProgress = async (userId, requirementId) => {
    const allSteps = await findStepsByTask(requirementId)
    const completedSteps = await findCompletedStepsForTaskByUser(
        userId,
        requirementId
    )
    if (allSteps.length === 0) {
        return null
    }
    const progress = Math.round((completedSteps.length / allSteps.length) * 100)
    return progress
}

// find all the requirements (NOTE: REQUIREMENTS NOT INCLUDING ASSIGNMENTS) for a track
const findRequirementsByTrack = trackId =>
    db("tasks_tracks")
        .join("tasks", "tasks.id", "tasks_tracks.tasks_id")
        .where({ tracks_id: trackId })
        .andWhere({ is_endorsement_requirement: true })

const getRequirementsWithProgress = async (userId, trackId) => {
    const requirements = await findRequirementsByTrack(trackId)
    const requirementsWithProgress = await Promise.all(
        requirements.map(async requirement => {
            const progress = await getRequirementProgress(
                userId,
                requirement.id
            )
            return {
                ...requirement,
                progress
            }
        })
    )
    return requirementsWithProgress
}

const getRequirementsWithProgressAndResources = async (userId, trackId) => {
    const requirements = await getRequirementsWithProgress(userId, trackId)
    const requirementsWithResources = await Promise.all(
        requirements.map(async requirement => {
            const resources = await findResourcesForRequirement(requirement.id)
            return {
                ...requirement,
                resources
            }
        })
    )
    return requirementsWithResources
}

module.exports = {
    findRequirementsByTrack,
    getRequirementProgress,
    getRequirementsWithProgress,
    getRequirementsWithProgressAndResources
}
