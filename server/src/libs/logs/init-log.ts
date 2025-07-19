import chalk from "chalk";

import { config } from "../../config";
import log from "./log";

const initLog = () => {
  const appTitle = config.APP_TITLE;
  const port = config.PORT;
  const localIp = config.LOCAL_IP;
  const nodeEnv = config.NODE_ENV;

  // Print startup banner
  console.log("\n" + "=".repeat(60));
  log.success(`🚀 ${appTitle} Server Started Successfully!`);
  console.log("=".repeat(60));

  // Environment info
  log.info(`Environment: ${chalk.cyan(nodeEnv.toUpperCase())}`);
  log.info(`Port: ${chalk.cyan(port)}`);

  // Access URLs
  log.info(`📡 Local:   ${chalk.cyan(`http://localhost:${port}`)}`);
  log.info(`🌐 Network: ${chalk.cyan(`http://${localIp}:${port}`)}`);

  // Additional info based on environment
  if (nodeEnv === "development") {
    log.info(`🔧 Development mode: Hot reload enabled`);
    log.debug(`Debug logging enabled`);
  } else {
    log.info(`🚀 Production mode: Optimized for performance`);
  }

  console.log("=".repeat(60) + "\n");
};

export default initLog;
