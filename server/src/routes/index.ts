import type { Express } from "express";
import { createServer, type Server } from "http";

import { log } from "../libs/logs";

export const registerRoutes = async (app: Express): Promise<Server> => {
  try {
    // Create HTTP server
    const httpServer = createServer(app);

    // Register API routes here
    // Example: app.use('/api/users', userRoutes);
    // Example: app.use('/api/auth', authRoutes);

    log.debug("Routes registered successfully");

    return httpServer;
  } catch (error) {
    log.error(`Failed to register routes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};
