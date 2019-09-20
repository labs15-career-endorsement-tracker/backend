exports.up = async function(knex) {
    return knex.schema.table("users", tbl => {
        tbl.integer("tracks_id")
            .nullable()
            .alter()
    })
}

exports.down = async function(knex) {
    await knex("users")
        .where({ tracks_id: null })
        .update({ tracks_id: 1 })
    return knex.schema.table("users", tbl => {
        tbl.integer("tracks_id")
            .notNullable()
            .alter()
    })
}
