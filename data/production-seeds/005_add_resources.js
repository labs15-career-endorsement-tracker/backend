const { resources } = require("../utils")
exports.seed = function(knex) {
    return knex("resources").insert(resources)
}
