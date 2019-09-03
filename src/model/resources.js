const db = require("../../data")

const findResourcesForRequirement = taskId => {
    return db("resources").where({ tasks_id: taskId })
}

module.exports = {
    findResourcesForRequirement
}
