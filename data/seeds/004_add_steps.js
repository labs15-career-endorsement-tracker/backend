exports.seed = function(knex) {
    return knex("steps").insert([
        {
            number: 1,
            description:
                "Get started with Creddle or Novoresume as a template. You can also use your own, but Creddle and Novoresume look great and take the guesswork out of formatting!",
            is_required: true,
            tasks_id: 1
        },
        {
            number: 2,
            description:
                "Use the resume rubric and resume deep-dive to make sure you’re including all required sections in your resume",
            is_required: true,
            tasks_id: 1
        },
        {
            number: 3,
            description:
                "Submit your resume for a free review through CV Compiler",
            is_required: true,
            tasks_id: 1
        },
        {
            number: 1,
            description: "Functioning, debugged, user-ready app",
            is_required: true,
            tasks_id: 2
        },
        {
            number: 2,
            description:
                "Clear screenshots of your app and coherent description of what it does",
            is_required: true,
            tasks_id: 2
        },
        {
            number: 1,
            description:
                "Send at least 5 cold outreach messages to someone on LinkedIn (or via email if you have their email addresses)",
            is_required: true,
            tasks_id: 3
        },
        {
            number: 2,
            description:
                "Submit screenshots of your outreach messages to your PM on Friday2",
            is_required: true,
            tasks_id: 3
        },
        {
            number: 3,
            description:
                "Identify three upcoming networking events that you can attend over the next month or two. If you live in an area without many events like this, then instead join three online groups relevant to your field and interests and post an introduction.",
            is_required: true,
            tasks_id: 3
        },
        {
            number: 1,
            description:
                "Remove any photos or posts that contain content that you would not want a potential employer to see. This may include profanity, criminal activity, heavy drinking/drug use, and discriminatory comments, but also could be more professional topics like badmouthing a previous employer- If you really want to keep these profiles, change your display name, photo, and personal information (keep in mind that archives may still show up in a google search). Make these accounts private. (Facebook, as a rule of thumb, should always be private!)",
            is_required: false,
            tasks_id: 4
        },
        {
            number: 2,
            description:
                "Update or create professional social media profiles:* Once you’ve cleaned up your social media, update your profile to reflect the professional brand you want people to see when they find you online. This is especially important for Twitter!- Have a professional headshot- Follow companies and industry leaders- Aim for 80% of your content to be tech/career-related. If you are new to Twitter, then make it a priority to spend ~10 minutes a day to share updates or awesome content you find. Don’t just retweet others!- Consider using Twitter as a way to document your learning journey with Lambda School; daily/weekly updates on the skills you’re building and projects you’re creating are a great way to show your enthusiasm in the field",
            is_required: false,
            tasks_id: 4
        },
        {
            number: 3,
            description:
                " Google yourself in an incognito window: What do you find? You might have to dig a little bit if you have a more common name, but try to see what comes up.- If you recently cleaned up your social media/changed your display name and photo, but you can still find content in a simple google search that you don’t want employers to see, consider deleting those accounts and/or using a professional nickname on your professional accounts and job applications.",
            is_required: false,
            tasks_id: 4
        },
        {
            number: 4,
            description:
                " Once you have done the above, submit to your TL with this sprint's retrospective:- Links to any of your public social media profiles- A 4-5 sentence paragraph reviewing the following: how much did you have to remove (if anything?) What are you going to do moving forward to ensure your social media is professional/tech-focused? Did anything surprise you when you searched for yourself?",
            is_required: false,
            tasks_id: 4
        },
        {
            number: 1,
            description: "A clear headshot and and professional user handle",
            is_required: true,
            tasks_id: 5
        },
        {
            number: 2,
            description:
                "Top six pinned projects, including open source contributions and Build Week or Labs projects",
            is_required: true,
            tasks_id: 5
        },
        {
            number: 3,
            description:
                "Weekly contributions, to show ongoing commitment to skills-building",
            is_required: true,
            tasks_id: 5
        }
    ])
}
