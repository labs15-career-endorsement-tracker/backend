import cleaner from "knex-cleaner"

export const seed = knex => cleaner.clean(knex)
