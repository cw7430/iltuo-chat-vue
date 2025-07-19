import app from './app';
import { config } from "./config";
import { errorHandler, viteMiddleware } from "./middlewares";
import { initLog, log } from "./libs/logs";
import { registerRoutes } from "./routes";

const { serveStatic, setupVite } = viteMiddleware;

const startServer = async () => {
  try {
    // Register routes and create HTTP server
    const server = await registerRoutes(app);

    // Setup error handling middleware (should be last)
    app.use(errorHandler);

    // Setup Vite middleware for development
    if (app.get("env") === "development") {
      await setupVite(app, server);
      log.info("🔧 Development mode: Vite middleware enabled");
    } else {
      serveStatic(app);
      log.info("🚀 Production mode: Static files served");
    }

    // Start server
    const port = config.PORT;
    server.listen(port, "0.0.0.0", () => {
      initLog();
      log.info(`✅ Server started successfully on port ${port}`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string) => {
      log.warn(`🛑 Received ${signal}. Starting graceful shutdown...`);
      server.close(() => {
        log.info("✅ Server closed successfully");
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    log.error(`❌ Failed to start server: ${error instanceof Error ? error.message : 'Unknown error'}`);
    if (error instanceof Error && error.stack) {
      log.error(error.stack);
    }
    process.exit(1);
  }
};

// Start the server
startServer();
