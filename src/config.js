import { resolve as resolvePath } from "path"

require("dotenv").config({
    path: resolvePath(__dirname, "../.env")
})

const { NODE_ENV } = process.env

const isProduction = NODE_ENV === "production"
const isTesting = NODE_ENV === "test"

export { isProduction, isTesting }
