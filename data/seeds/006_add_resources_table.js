exports.seed = function(knex) {
    return knex("resources").insert([
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
    ])
}
