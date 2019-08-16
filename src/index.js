import { port, version } from "./config"
import app from "./app"

app.listen(port, () => {
    console.log(`REST API => http://localhost:${port}/api/v${version}`)
})
