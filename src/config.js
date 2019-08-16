import { resolve as resolvePath } from "path"

require("dotenv").config({
    path: resolvePath(__dirname, "../.env")
})

const { NODE_ENV, DATABASE_URL, TEST_DATABASE_URL } = process.env

const environment = NODE_ENV || "development"
const isTesting = environment === "test"
const dbUrl = isTesting ? TEST_DATABASE_URL : DATABASE_URL

export { environment, dbUrl }
