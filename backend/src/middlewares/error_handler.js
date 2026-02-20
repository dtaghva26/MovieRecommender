import  AppError  from "../config/AppError.js";

function errorHandler(err, req, res, next) {
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;
  const code = isAppError ? err.code : "INTERNAL_ERROR";
  const message = isAppError ? err.message : "Internal server error";

  
  console.error(err);

  res.status(statusCode).json({
    error: { code, message }
  });
}
export default errorHandler;