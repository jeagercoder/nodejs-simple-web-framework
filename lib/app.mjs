
import { createServer } from 'node:http'

import { SimpleRouter } from './router.mjs'
import { Middleware } from './middleware.mjs'
import { BaseError, NotFoundError, NotAllowedMethodError } from './error.mjs'


export class SimpleApp {
    addr
    port
    routers = []
    constructor(addr, port) {
        this.addr = addr
        this.port = port
        this.middleware = new Middleware()
    }

    get(pattern, handler) {
        const router = new SimpleRouter("GET", pattern, handler)
        this.routers.push(router)
    }

    post(pattern, handler) {
        const router = new SimpleRouter("POST", pattern, handler)
        this.routers.push(router)
    }

    use(middleware) {
        this.middleware.use(middleware)
    }

    getHandler(method, pattern) {
        for (const router of this.routers) {
            if (router.pattern === pattern) {
                if (router.method === method) {
                    return router.handler
                }
                throw new NotAllowedMethodError()
            }
        }
        throw new NotFoundError()
    }


    handle(req, res) {
        try {
            this.middleware.run(req, res, (err, req, res) => {
                if (err) { throw err }
                const url = new URL(`http://${this.addr}${req.url}`)
                const handler = this.getHandler(req.method, url.pathname)
                handler(req, res)
            })
        } catch (err) {
            if (err instanceof BaseError) {
                res.writeHead(err.code, err.contentType)
                res.end(JSON.stringify(err.detail))

            } else {
                console.log(err)
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: "Unknown error." }))
            }
        }
    }


    run() {
        const server = createServer((req, res) => {
            this.handle(req, res)
        })
        server.listen(this.port, this.addr, () => {
            console.log(`Listening on ${this.addr}:${this.port}`)
        })
    }

}
