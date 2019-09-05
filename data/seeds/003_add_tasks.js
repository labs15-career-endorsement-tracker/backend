const { tasks } = require("../utils/tasks")
exports.seed = function(knex) {
    return knex("tasks").insert(tasks)
}
