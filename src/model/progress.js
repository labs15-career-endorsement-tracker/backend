const { findRequirementsByTrack } = require("./requirements")
const { findStepsByTask } = require("./steps")
const { findCompletedRequirementStepsByUser } = require("./completedSteps")

const getProgress = async user => {
    const allSteps = []
    const requirements = await findRequirementsByTrack(user.tracks_id)
    for (requirement of requirements) {
        const steps = await findStepsByTask(requirement.id)
        allSteps.push(...steps)
    }
    const completedSteps = await findCompletedRequirementStepsByUser(user.id)
    const progress = Math.round((completedSteps.length / allSteps.length) * 100)
    return progress
}

module.exports = {
    getProgress
}
