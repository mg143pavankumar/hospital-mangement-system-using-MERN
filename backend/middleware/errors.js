import ErrorHandler from "../utils/errorHandler.js";

const errorsMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // if wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHandler(400, message);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid, try again`;
    err = new ErrorHandle(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, try again`;
    err = new ErrorHandle(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
  });
};

export default errorsMiddleware;
