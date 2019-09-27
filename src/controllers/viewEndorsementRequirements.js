const {
    findUsersBy,
    getRequirementsWithProgressAndResources
} = require("../model")

const viewEndorsementRequirements = async (req, res, next) => {
    const id = res.locals.userId
    try {
        const { tracks_id } = await findUsersBy({ id }).first()
        const requirements = await getRequirementsWithProgressAndResources(
            id,
            tracks_id
        )
        res.json(requirements)
    } catch (error) {
        next(error)
    }
}

module.exports = [viewEndorsementRequirements]
