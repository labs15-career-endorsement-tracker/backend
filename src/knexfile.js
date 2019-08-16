import { resolve as resolvePath } from "path"

import { dbUrl } from "./config"

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

const commonConfig = {
    client,
    connection: dbUrl,
    pool,
    migrations,
    seeds
}

export const development = commonConfig
export const staging = commonConfig
export const production = commonConfig

export default {
    development,
    staging,
    production
}
