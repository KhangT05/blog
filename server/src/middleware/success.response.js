const StatusCode = {
    CREATED: 201,
    OK: 200
}
const ReasonStatusCode = {
    CREATED: 'Created',
    OK: 'Success'
}
class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, metaData = {}, reasonStatus = ReasonStatusCode.OK }) {
        this.message = message || reasonStatus;
        this.statusCode = statusCode;
        this.metaData = metaData;
    }
    send(res, headers = {}) {
        return res.status(this.statusCode).json(this)
    }
}
class CREATED extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATED, metaData = {}, reasonStatus = ReasonStatusCode.CREATED }) {
        super({ message, statusCode, metaData, reasonStatus })
    }
}
class OK extends SuccessResponse {
    constructor({ message, metaData = {} }) {
        super({ message, metaData })
    }
}
module.exports = {
    CREATED,
    OK
}