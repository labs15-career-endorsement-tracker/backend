exports.up = async knex => {
    const hasTable = await knex.schema.hasTable("resources")
    if (hasTable) return

    return knex.schema.createTable("resources", resources => {
        resources.increments()
        resources
            .enu("type", ["google_doc", "youtube_vid", "unspecified"])
            .notNullable()
        resources.string("title", 255).notNullable()
        resources.string("url")
        resources.text("description")
        resources
            .integer("tasks_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("tasks")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("resources")
}
