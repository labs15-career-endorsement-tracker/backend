import { isProduction, isTesting } from "./config"

console.log(isProduction, isTesting)
const test = () => console.log("this is not an object")
console.log(test())
export default test
