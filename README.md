# Node.js Simple Web Framework


### Quick start


```js
//app.mjs

import { SimpleApp } from "./lib/app.mjs";
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


// run: node --env-file .env app.mjs
```


### Write middleware
```js
export function Customleware(req, res, next) {
    // Execute before handler
    next()
    // Execute after handler
}
```