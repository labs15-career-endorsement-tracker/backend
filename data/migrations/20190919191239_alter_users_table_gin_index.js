exports.up = async function(knex) {
    const hasTable = await knex.schema.hasTable("users")
    if (!hasTable) return

    return knex.schema.table("users", tbl => {
        tbl.specificType("full_text", "tsvector")

        tbl.index("full_text", "full_text_index", "GIN")
    })
}

exports.down = function(knex) {
    return knex.schema.table("users", async tbl => {
        tbl.dropColumn("full_text")
        tbl.dropIndex("full_text_index")
    })
}
