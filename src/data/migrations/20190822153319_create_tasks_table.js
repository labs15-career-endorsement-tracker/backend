exports.up = function(knex) {
    return knex.schema.createTable("tasks", tasks => {
        tasks.increments()
        tasks.string("title", 255).notNullable()
        tasks.boolean("is_required").notNullable()
        tasks.string("description").notNullable()
        tasks.boolean("is_endorsement_requirement").notNullable()
        tasks
            .integer("tracks_id")
            .unsigned()
            .references("id")
            .inTable("tracks")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE")
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("tasks")
}
