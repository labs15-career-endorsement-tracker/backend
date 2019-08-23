const { port, version } = require("./config")
const app = require("./app")

app.listen(port, () => {
    console.log(`REST API => http://localhost:${port}/api/v${version}`)
})
