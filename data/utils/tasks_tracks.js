module.exports = {
    tasksTracks: [
        // Resume belongs to all tracks
        { tasks_id: 1, tracks_id: 1 },
        { tasks_id: 1, tracks_id: 2 },
        { tasks_id: 1, tracks_id: 3 },
        { tasks_id: 1, tracks_id: 4 },
        { tasks_id: 1, tracks_id: 5 },
        // LinkedIn belongs to all tracks
        { tasks_id: 2, tracks_id: 1 },
        { tasks_id: 2, tracks_id: 2 },
        { tasks_id: 2, tracks_id: 3 },
        { tasks_id: 2, tracks_id: 4 },
        { tasks_id: 2, tracks_id: 5 },
        // Green Github belongs to all tracks EXCEPT UX
        { tasks_id: 3, tracks_id: 1 },
        { tasks_id: 3, tracks_id: 2 },
        { tasks_id: 3, tracks_id: 3 },
        { tasks_id: 3, tracks_id: 4 },
        // Web Portfolio
        { tasks_id: 4, tracks_id: 1 },
        // Portfolio for all other tracks
        { tasks_id: 5, tracks_id: 2 },
        { tasks_id: 5, tracks_id: 3 },
        { tasks_id: 5, tracks_id: 4 },
        { tasks_id: 5, tracks_id: 5 },
        // Active App for Mobile Devs
        { tasks_id: 6, tracks_id: 2 },
        { tasks_id: 6, tracks_id: 4 }
    ]
}
