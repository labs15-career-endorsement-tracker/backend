const cleaner = require("knex-cleaner")
exports.seed = knex => cleaner.clean(knex)
