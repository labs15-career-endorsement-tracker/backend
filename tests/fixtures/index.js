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

module.exports = { fakeUsers }
