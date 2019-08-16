import knex from "knex"

import { environment } from "../config"
import config from "../knexfile"

export default knex(config[environment])
