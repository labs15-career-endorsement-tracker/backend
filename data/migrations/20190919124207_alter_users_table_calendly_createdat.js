exports.up = async function(knex) {
    const hasTable = await knex.schema.hasTable("users")
    if (!hasTable) return

    const hasColumn = await knex.schema.hasColumn("users", "calendly_link")
    if (hasColumn) return

    return knex.schema.table("users", tbl => {
        tbl.string("calendly_link")

        tbl.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())

        tbl.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.table("users", async tbl => {
        tbl.dropColumn("calendly_link")
        tbl.dropColumn("created_at")
        tbl.dropColumn("updated_at")
    })
}
