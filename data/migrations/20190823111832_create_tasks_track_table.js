exports.up = async knex => {
    const hasTable = await knex.schema.hasTable("tasks_tracks")
    if (hasTable) return

    return knex.schema.createTable("tasks_tracks", tbl => {
        tbl.increments()
        tbl.integer("tracks_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("tracks")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE")
        tbl.integer("tasks_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("tasks")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.unique(["tasks_id", "tracks_id"])
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("tasks_tracks")
}
