import os from "os";
import dotenv from "dotenv";
import path from "path";

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface || []) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address;
      }
    }
  }
  return "localhost";
};

const localIp = getLocalIP();

// Load .env.common from the root directory
dotenv.config({ path: path.resolve(process.cwd(), ".env.common") });

// Load .env from the server directory, overriding any common variables
dotenv.config({ path: path.resolve(process.cwd(), "server", ".env"), override: true });

// Validate and export typed configuration
export const config = {
  LOCAL_IP: localIp,
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  APP_TITLE: process.env.VITE_APP_TITLE || "Iltuo Chat",
  DATABASE_HOST: process.env.DB_HOST,
  DATABASE_PORT: parseInt(process.env.DB_PORT || "3306", 10),
  DATABASE_USER: process.env.DB_USER,
  DATABASE_PASSWORD: process.env.DB_PASSWORD,
  DATABASE_NAME: process.env.DB_NAME,
  DB_CHARSET: process.env.DB_CHARSET || "utf8mb4",
  VITE_CLIENT_ENTRY: process.env.VITE_CLIENT_ENTRY || "/src/main.ts",
};
