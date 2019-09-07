exports.up = async knex => {
    const hasTable = await knex.schema.hasTable("steps")
    if (hasTable) return

    return knex.schema.createTable("steps", steps => {
        steps.increments()
        steps
            .integer("number")
            .unsigned()
            .notNullable()
        steps.text("steps_description").notNullable()
        steps.boolean("is_required").notNullable()
        steps
            .integer("tasks_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("tasks")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")

        steps.unique(["tasks_id", "number"])
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("steps")
}
