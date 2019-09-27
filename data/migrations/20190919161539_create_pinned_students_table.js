exports.up = async function(knex) {
    const hasTable = await knex.schema.hasTable("pinned_students")
    if (hasTable) return
    return knex.schema.createTable("pinned_students", tbl => {
        tbl.increments()
        tbl.integer("coach_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.integer("student_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
        tbl.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now())
        tbl.unique(["coach_id", "student_id"])
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pinned_students")
}
