import { environment } from "./config"
import { getAllUsers } from "./model"

const test = async () => {
    try {
        const users = await getAllUsers()
        console.log(users)
    } catch (error) {
        console.log(error)
    }
}
test()
console.log(environment)
