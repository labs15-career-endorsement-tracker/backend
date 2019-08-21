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

<<<<<<< HEAD
export const development = commonConfig
=======
>>>>>>> 5e41afa7cadfce99dc8f65affe817e2cd0a13f18
export const staging = commonConfig
export const test = commonConfig
export const production = commonConfig

export default {
    development,
    staging,
    test,
    production
}
