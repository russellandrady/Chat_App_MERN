export const errorHandler = (statusCode, message) => {
    const error = new Error(message);//creating a custom error
    error.statusCode = statusCode;
    error.message = message;
    return error;
}
