const bcrypt = require("bcryptjs")

const fakeUsers = [
    {
        first_name: "bob",
        last_name: "ross",
        email: "bob_ross@happylittlemistakes.com",
        password: bcrypt.hashSync("Password1234!", 4),
        tracks_id: 1
    }
]
const fakeTracks = [{ title: "Web" }]
const fakeTasks = [
    {
        title: "Requirement 1",
        is_required: true,
        tasks_description: "Requirement 1 description",
        is_endorsement_requirement: true
    },
    {
        title: "Requirement 2",
        is_required: true,
        tasks_description: "Requirement 2 description",
        is_endorsement_requirement: true
    },
    {
        title: "Requirement 3",
        is_required: true,
        tasks_description: "Requirement 3 description",
        is_endorsement_requirement: false
    }
]
const fakeTasksTracks = [
    { tracks_id: 1, tasks_id: 1 },
    { tracks_id: 1, tasks_id: 3 }
]

const fakeSteps = [
    {
        number: 1,
        steps_description: "Requirement 1 step 1",
        is_required: true,
        tasks_id: 1
    },
    {
        number: 3,
        steps_description: "Requirement 1 step 3",
        is_required: true,
        tasks_id: 1
    },
    {
        number: 2,
        steps_description: "Requirement 1 step 2",
        is_required: true,
        tasks_id: 1
    },
    {
        number: 1,
        steps_description: "Requirement 2 step 1",
        is_required: true,
        tasks_id: 3
    },
    {
        number: 2,
        steps_description: "Requirement 2 step 2",
        is_required: true,
        tasks_id: 3
    },
    {
        number: 3,
        steps_description: "Requirement 3 step 3",
        is_required: true,
        tasks_id: 3
    }
]

// hard code the created_at for testability
const fakeCompletedSteps = [
    {
        user_id: 1,
        steps_id: 1,
        created_at: new Date("2019-08-28T19:24:40.504Z")
    },
    {
        user_id: 1,
        steps_id: 2,
        created_at: new Date("2019-08-28T19:24:40.504Z")
    },
    {
        user_id: 1,
        steps_id: 6,
        created_at: new Date("2019-08-28T19:24:40.504Z")
    }
]

module.exports = {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks,
    fakeCompletedSteps
}
