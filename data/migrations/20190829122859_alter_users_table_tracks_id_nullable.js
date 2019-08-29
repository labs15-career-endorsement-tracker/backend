exports.up = function(knex) {
    return knex.schema.alterTable("users", users => {
        users
            .integer("tracks_id")
            .nullable()
            .alter()
    })
}

exports.down = function(knex) {
    return knex.schema.alterTable("users", users => {
        users
            .integer("tracks_id")
            .notNullable()
            .alter()
    })
}
