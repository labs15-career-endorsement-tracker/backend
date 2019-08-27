const db = require("../../data")

// get all the requirements (NOTE: REQUIREMENTS NOT INCLUDING ASSIGNMENTS) for a track
const findRequirementsByTrack = trackId =>
    db("tasks_tracks")
        .join("tasks", "tasks.id", "tasks_tracks.tasks_id")
        .where({ tracks_id: trackId })
        .andWhere({ is_endorsement_requirement: true })

module.exports = { findRequirementsByTrack }
