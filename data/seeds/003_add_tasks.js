exports.seed = function(knex) {
    return knex("tasks").insert([
        {
            title: "Update Resume",
            is_required: true,
            tasks_description:
                "Update your resume to include your recent work history",
            is_endorsement_requirement: true
        },
        {
            title: "Deploy an app to app store",
            is_required: true,
            tasks_description:
                "You must have an app deployed on the app store in order to be career endorsed",
            is_endorsement_requirement: true
        },
        {
            title: "Networking Strategies",
            is_required: true,
            tasks_description:
                "80% of jobs are found through networking, so students should be finding opportunities to build their professional networks throughout their time as a student at Lambda School",
            is_endorsement_requirement: false
        },
        {
            title: "Groom Your Social Media",
            is_required: false,
            tasks_description:
                "Groom your Twitter, Facebook, Instagram, or any other public social media profiles:- Remove any photos or posts that contain content that you would not want a potential employer to see.",
            is_endorsement_requirement: false
        },
        {
            title: "Green GitHub with quality contributions",
            is_required: true,
            tasks_description:
                "You should have quality contributions in your git hub",
            is_endorsement_requirement: true
        }
    ])
}
