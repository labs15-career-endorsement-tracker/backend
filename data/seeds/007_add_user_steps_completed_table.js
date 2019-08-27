exports.seed = function(knex) {
    return knex("user_steps_completed").insert([
        { user_id: 1, steps_id: 1 },
        { user_id: 1, steps_id: 2 },
        { user_id: 1, steps_id: 6 }
    ])
}
