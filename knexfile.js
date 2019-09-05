const { resolve: resolvePath } = require("path")

const { dbUrl } = require("./src/config")

const client = "postgresql"
const pool = {
    min: 2,
    max: 10
}

const migrations = {
    tableName: "knex_migrations",
    directory: resolvePath(__dirname, "./data/migrations")
}

const seeds = { directory: resolvePath(__dirname, "./data/seeds") }
const productionSeeds = { directory: resolvePath(__dirname, "./data/production-seeds") }

const commonConfig = {
    client,
    connection: dbUrl,
    pool,
    migrations,
    seeds
}

const development = commonConfig
const staging = commonConfig
const test = commonConfig
const production = {...commonConfig, seeds: productionSeeds}

module.exports = {
    development,
    staging,
    test,
    production
}
