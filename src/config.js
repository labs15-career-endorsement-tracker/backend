import { resolve as resolvePath } from "path"

import { version } from "../package.json"

require("dotenv").config({
    path: resolvePath(__dirname, "../.env")
})

const { NODE_ENV, DATABASE_URL, TEST_DATABASE_URL, PORT } = process.env

const environment = NODE_ENV || "development"
const isTesting = environment === "test"
const dbUrl = isTesting ? TEST_DATABASE_URL : DATABASE_URL
const port = PORT || 5000

export { environment, dbUrl, port, version }
