import { SimpleApp } from "./lib/app.mjs";
import { NotAllowedMethodError } from "./lib/error.mjs";
import { LogMiddleware } from "./lib/middleware.mjs";



const ADDR = process.env.ADDR
const PORT = process.env.PORT


const app = new SimpleApp(ADDR, PORT)

// Adding middleware 
app.use(LogMiddleware)


// Adding handler
app.get("/", (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({
        page: "home"
    }))
})

app.run()

