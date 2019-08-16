import { createMany, createUser } from "../utils"

export const seed = knex =>
    knex("users").then(() => knex("users").insert(createMany(createUser)))
