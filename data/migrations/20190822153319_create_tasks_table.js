exports.up = async knex => {
    const hasTable = await knex.schema.hasTable("tasks")
    if (hasTable) return

    return knex.schema.createTable("tasks", tasks => {
        tasks.increments()
        tasks.string("title", 255).notNullable()
        tasks.boolean("is_required").notNullable()
        tasks.string("tasks_description").notNullable()
        tasks.boolean("is_endorsement_requirement").notNullable()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("tasks")
}
