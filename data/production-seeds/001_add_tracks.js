const { tracks } = require("../utils")
exports.seed = function(knex) {
    return knex("tracks").insert(tracks)
}
