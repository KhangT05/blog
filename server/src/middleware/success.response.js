const StatusCode = {
    CREATED: 201,
    OK: 200
}
const ReasonStatusCode = {
    CREATED: 'Success',
    OK: 'OK'
}
class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, metaData = {}, reason = ReasonStatusCode.OK }) {
        this.message = message;
        this.statusCode = statusCode;
        this.metaData = metaData;
        this.reason = reason;
    }
    send(res, headers = {}) {
        return res.status(this.statusCode).json({
            message: this.message,
            data: this.metaData,
        })
    }
}
class Created extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATED, metaData = {}, reason = ReasonStatusCode.CREATED }) {
        super({ message, statusCode, metaData, reason })
    }
}
class Ok extends SuccessResponse {
    constructor({ message, metaData = {} }) {
        super({ message, metaData })
    }
}
const CREATED = async (res, message, metaData, statusCode, reason) => {
    new Created({
        message,
        metaData,
        statusCode,
        reason
    }).send(res);
}
const OK = async (res, message, metaData) => {
    new Ok({
        message,
        metaData,
    }).send(res);
}
module.exports = {
    CREATED,
    OK
}