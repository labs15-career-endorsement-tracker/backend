import request from "supertest"

import { version } from "../../src/config"
import db from "../../src/data"
import app from "../../src/app"

describe("GET /users", () => {
    beforeEach(done => {
        db.migrate
            .latest()
            .then(() => db.seed.run())
            .then(() => done())
    })

    afterEach(done => {
        db.destroy()
        done()
    })

    it("Returns a list of users", done => {
        request(app)
            .get(`/api/v${version}/users`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveLength(1000)
                done()
            })
    })
})
