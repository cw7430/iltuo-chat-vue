import { type Request, type Response, type NextFunction } from "express";

import { log } from "../libs/logs";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
  const path = req.path;
  const method = req.method;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const ip = req.ip || 'Unknown';

  let capturedJsonResponse: object | undefined;

  // Capture response body for logging
  const originalResJson = res.json;
  res.json = (bodyJson, ...args) => {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    // Only log API requests
    if (path.startsWith("/api")) {
      const statusColor = statusCode >= 400 ? 'error' : statusCode >= 300 ? 'warn' : 'info';
      const logMethod = log[statusColor];

            let logLine = `${method} ${path} ${statusCode} ${duration}ms`;

      // Add response body for debugging (only for errors or small responses)
      if (capturedJsonResponse && statusCode >= 400) {
        const responseStr = JSON.stringify(capturedJsonResponse);
        if (responseStr.length <= 200) {
          logLine += ` :: ${responseStr}`;
        } else {
          logLine += ` :: ${responseStr.slice(0, 197)}...`;
        }
      }

      // Add request info for debugging
      if (statusCode >= 400) {
        logLine += ` | IP: ${ip} | UA: ${userAgent.slice(0, 50)}`;
      }

      logMethod(logLine);
    }
  });

  next();
};

export default logMiddleware;
