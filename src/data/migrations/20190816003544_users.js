export const up = knex =>
    knex.schema.createTable("users", users => {
        users.increments()

        users.string("first_name")
        users.string("last_name")
        users
            .string("email", 255)
            .notNullable()
            .unique()
        users.string("password", 255)
        users.string("track", 255)
    })

export const down = knex => knex.schema.dropTableIfExists("users")
