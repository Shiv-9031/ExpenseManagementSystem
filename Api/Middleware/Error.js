export const ErrorHandler = (err, req, res, next) => {
  err.message = err.message || "internal server error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
    error: err,
  });
};
