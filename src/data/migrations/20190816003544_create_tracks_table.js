exports.up = knex =>
    knex.schema.createTable("tracks", tracks => {
        tracks.increments()
        tracks
            .string()
            .notNullable()
            .unique()
    })
exports.down = knex => knex.schema.dropTableIfExists("tracks")
