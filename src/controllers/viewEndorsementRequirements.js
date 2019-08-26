const { getRequirementsWithProgress, findUsersBy } = require("../model")

const viewEndorsementRequirements = async (req, res, next) => {
    const id = req.userId
    try {
        const { tracks_id } = await findUsersBy({ id }).first()
        const requirements = await getRequirementsWithProgress(tracks_id, id)
        res.json({ requirements })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = [viewEndorsementRequirements]
