exports.up = async knex => {
    const hasTable = await knex.schema.hasTable("users")
    if (hasTable) return

    return knex.schema.createTable("users", users => {
        users.increments()

        users.string("first_name")
        users.string("last_name")
        users
            .string("email", 255)
            .notNullable()
            .unique()
        users.string("password", 255)
        users.string("device_token").unique()
        users
            .boolean("is_admin")
            .notNullable()
            .defaultTo(false)
        users
            .integer("tracks_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("tracks")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE")
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users")
}
