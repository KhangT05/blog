const errorHandler = (error,request,response,next) => {
    const statusCode = response.status === 200 ? 500 : response.statusCode;
    const message = error?.message;
    return response.status(statusCode).json({
        success:false,
        msg: message
    })
};
const notFound = (req,res,next) => {
    const error = new Error(`Route ${req.method} ${req.originalUrl} không tìm thấy.`)
    res.status(403)
    next(error)
}
module.exports = {
    errorHandler,
    notFound
}