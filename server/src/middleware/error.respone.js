const StatusCode = {
    BAD_REQUEST: 400,
    CONFLICT: 409
}
const ReasonStatusCode = {
    BAD_REQUEST: 'Bad request error',
    CONFLICT: 'Conflict error'
}

class ErrorRespone extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
class ConFlictRequestError extends ErrorRespone {
    constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode)
    }
}
class BadRequestError extends ErrorRespone {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}
module.exports = {
    ConFlictRequestError,
    BadRequestError
}