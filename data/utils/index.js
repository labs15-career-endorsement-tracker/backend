const { createMany, createUser } = require("./users")
const { tracks } = require("./tracks")
const { tasks } = require("./tasks")
const { steps } = require("./steps")
const { tasksTracks } = require("./tasks_tracks")
const { resources } = require("./resources")
const { userStepsCompleted } = require("./user_steps_completed")

module.exports = {
    createMany,
    createUser,
    tracks,
    tasks,
    steps,
    tasksTracks,
    resources,
    userStepsCompleted
}
