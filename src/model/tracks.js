const db = require("../../data")

const findAllTracks = () => db("tracks")

module.exports = { findAllTracks }
