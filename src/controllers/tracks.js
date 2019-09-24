const { findAllTracks } = require("../model")

const viewTracks = async (req, res, next) => {
    try {
        const tracks = await findAllTracks()
        res.json(tracks)
    } catch (error) {
        next(error)
    }
}

module.exports = viewTracks
