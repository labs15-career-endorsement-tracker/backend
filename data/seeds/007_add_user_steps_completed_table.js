const { userStepsCompleted } = require("../utils")
exports.seed = function(knex) {
    return knex("user_steps_completed").insert(userStepsCompleted)
}
