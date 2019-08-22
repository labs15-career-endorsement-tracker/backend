exports.up = knex =>
    knex.schema.createTable("tracks", tracks => {
        tracks.increments()
        tracks
            .string("title")
            .notNullable()
            .unique()
    })
exports.down = knex => knex.schema.dropTableIfExists("tracks")
