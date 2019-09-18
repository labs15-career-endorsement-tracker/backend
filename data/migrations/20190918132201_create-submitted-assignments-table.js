exports.up = function(knex) {
    return knex.schema.createTable("submitted_assignments", tbl => {
        tbl.increments()
        tbl.integer("user_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.integer("tasks_id")
            .notNullable()
            .unsigned()
            .references("id")
            .inTable("tasks")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        tbl.string("url").notNullable()
        tbl.boolean("is_approved").defaultTo(false)
        tbl.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
        tbl.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("submitted_assignments")
}
