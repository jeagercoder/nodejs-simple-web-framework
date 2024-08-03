


export class BaseError extends Error {
    defaultCode = 500
    defaultDetail = {
        message: "Internal server error."
    }
    defaultContentType = { 'Content-Type': 'application/json' }
    contentType
    code
    detail

    constructor(code, detail, contentType) {
        super()
        this.code = code || this.defaultCode
        this.detail = detail || this.defaultDetail
        this.contentType = contentType || this.defaultContentType
    }
}


export class NotAllowedMethodError extends BaseError {
    constructor() {
        super(405, {message: "Method not allowed."})
    }
}


export class NotFoundError extends BaseError {
    constructor() {
        super(404, {message: 'Not found'})
    }
}


export class UnauthenticatedError extends BaseError {
    constructor() {
        super(401, {message: 'Unauthenticated.'})
    }
}


export class ForbiddenError extends BaseError {
    constructor(detail={}) {
        super(403, detail=detail)
    }
}
