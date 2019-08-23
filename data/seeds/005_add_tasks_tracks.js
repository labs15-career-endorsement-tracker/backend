exports.seed = function(knex) {
    return knex("tasks_tracks").insert([
        { tasks_id: 1, tracks_id: 1 },
        { tasks_id: 1, tracks_id: 2 },
        { tasks_id: 1, tracks_id: 3 },
        { tasks_id: 1, tracks_id: 4 },
        { tasks_id: 1, tracks_id: 5 }
    ])
}
