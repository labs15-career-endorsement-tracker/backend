const { tasksTracks } = require("../utils")
exports.seed = function(knex) {
    return knex("tasks_tracks").insert(tasksTracks)
}
