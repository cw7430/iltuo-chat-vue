import { type ErrorRequestHandler, type Request, type Response, type NextFunction } from "express";
import { log } from "../libs/logs";

interface CustomError extends Error {
  status?: number;
  statusCode?: number;
  code?: string;
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    status: number;
    stack?: string;
    timestamp?: string;
  };
}

const errorHandler: ErrorRequestHandler = (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errorCode = err.code || 'UNKNOWN_ERROR';

  // Log error details
  log.error(`[${status}] ${errorCode}: ${message}`);
  log.error(`Request: ${req.method} ${req.path}`);
  log.error(`IP: ${req.ip || req.connection.remoteAddress || 'Unknown'}`);

  if (process.env.NODE_ENV === "development" && err.stack) {
    log.error(`Stack trace: ${err.stack}`);
  }

  // Send appropriate error response
  const errorResponse: ErrorResponse = {
    error: {
      code: errorCode,
      message: message,
      status: status
    }
  };

  // Add additional info in development
  if (process.env.NODE_ENV === "development") {
    errorResponse.error.stack = err.stack;
    errorResponse.error.timestamp = new Date().toISOString();
  }

  res.status(status).json(errorResponse);
};

export default errorHandler;
