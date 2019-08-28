exports.up = async knex => {
    const hasTable = await knex.schema.hasTable("tracks")
    if (hasTable) return

    return knex.schema.createTable("tracks", tracks => {
        tracks.increments()
        tracks
            .string("title")
            .notNullable()
            .unique()
    })
}

exports.down = knex => knex.schema.dropTableIfExists("tracks")
