exports.seed = function(knex) {
    return knex("tracks").insert([
        { title: "Full-Stack Web" },
        { title: "iOS" },
        { title: "Data Science" },
        { title: "Android" },
        { title: "UX Design" },
        { title: "Coach" }
    ])
}
