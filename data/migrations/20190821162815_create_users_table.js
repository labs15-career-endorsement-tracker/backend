exports.up = function(knex) {
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
        users.boolean("is_admin").notNullable()
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
