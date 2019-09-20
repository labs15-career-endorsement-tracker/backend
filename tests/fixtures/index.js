const bcrypt = require("bcryptjs")
const { staticUser } = require("../../data/utils")

const fakeUsers = [staticUser]

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
    },
    {
        title: "Requirement 4",
        is_required: true,
        tasks_description: "Requirement 4 description",
        is_endorsement_requirement: true
    }
]
const fakeTasksTracks = [
    { tracks_id: 1, tasks_id: 1 },
    { tracks_id: 1, tasks_id: 3 },
    { tracks_id: 1, tasks_id: 4 }
]

const fakeSteps = [
    // Only these first three steps belong to a REQUIREMENT
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
    },
    {
        number: 1,
        steps_description: "Requirement 2 step 1",
        is_required: true,
        tasks_id: 4
    },
    {
        number: 2,
        steps_description: "Requirement 2 step 2",
        is_required: true,
        tasks_id: 4
    },
    {
        number: 3,
        steps_description: "Requirement 3 step 3",
        is_required: true,
        tasks_id: 4
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
    },
    {
        user_id: 1,
        steps_id: 7,
        created_at: new Date("2019-08-28T19:24:40.504Z")
    }
]

const fakeResources = [
    {
        type: "google_doc",
        title: "Action verbs for technical resumes",
        tasks_id: 1,
        url:
            "https://docs.google.com/document/d/1wZkDPBWtQZDGGdvStD61iRx_jOWVlIyyQl9UOYHtZgA/edit"
    },
    {
        type: "google_doc",
        title: "Power statement article",
        tasks_id: 1,
        url:
            "https://www.linkedin.com/pulse/20140929001534-24454816-my-personal-formula-for-a-better-resume/"
    },
    {
        type: "google_doc",
        title: "'Lambda is…' paragraphs",
        tasks_id: 1,
        url:
            "https://docs.google.com/document/d/19OxIgJYkLMq4c1o5zHu1Na4a3PYcyutOosVfg6a03RI/edit"
    },
    {
        type: "youtube_vid",
        title: "Link to Recorded Video",
        tasks_id: 3,
        url: "https://youtu.be/osyavDyNeQ4"
    },
    {
        type: "youtube_vid",
        title: "Link to Recorded Video",
        tasks_id: 4,
        url: "https://youtu.be/AdAA9d5vCaE"
    }
]

const fakePinnedStudents = [
    {
        id: 1,
        coach_id: 1002
    }
]

module.exports = {
    fakeUsers,
    fakeTasks,
    fakeSteps,
    fakeTasksTracks,
    fakeTracks,
    fakeCompletedSteps,
    fakeResources
}
