export const responseSuccess=(res,statusCode,message,data)=>{
    res.status(statusCode).json({
        message,
        data
    })
}
export const responseError=(res,statusCode,message,error)=>{
    res.status(statusCode).json({
        message,
        error
    })
}