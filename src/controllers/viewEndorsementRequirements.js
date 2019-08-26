const { findTasksByTrack, findUsersBy } = require("../model")

const viewEndorsementRequirements = async (req, res, next) => {
    const id = req.userId
    try {
        const { tracks_id } = await findUsersBy({ id }).first()
        const requirements = await findTasksByTrack(tracks_id, id)
        // console.log(requirements)
    } catch (error) {}
    res.json({ id })
}

module.exports = [viewEndorsementRequirements]
