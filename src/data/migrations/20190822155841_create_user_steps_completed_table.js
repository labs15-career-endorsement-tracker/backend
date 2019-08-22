exports.up = function(knex) {
    return knex.schema.createTable("user_steps_completed", completed => {
        completed.increments()
        completed
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        completed
            .integer("steps_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("steps")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        completed
            .timestamp("created_at", { useTz: true })
            .defaultTo(knex.fn.now())
        completed.unique(["user_id", "steps_id"])
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("user_steps_completed")
}
