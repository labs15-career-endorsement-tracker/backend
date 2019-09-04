const { steps } = require("../utils")
exports.seed = function(knex) {
    return knex("steps").insert(steps)
}
