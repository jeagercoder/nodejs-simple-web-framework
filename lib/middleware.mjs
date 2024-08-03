import { ForbiddenError } from "./error.mjs"



export class Middleware {
    middlewares = []
    constructor() {}

    use(middleware) {
        this.middlewares.push(middleware)
    }

    run(req, res, done) {
        const stack = this.middlewares.slice()
        console.log(stack)
        const next = () => {
            const middleware = stack.shift()
            if (!middleware) {
                done(null, req, res)
                return
            }
            try {
                middleware(req, res, next)
            } catch (err) {
                done(err, req, res)
                return
            }
        }
        next()
    }
}


export function LogMiddleware(req, res, next) {
    res.on('finish', () => {
        const now = new Date()
        const isoDateTime = now.toISOString()
        const statusCode = res.statusCode
        const log = `${isoDateTime} ${req.method} ${req.url} ${statusCode}`
        console.log(log)
    })
    next()
}

