import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { config } from "../configs";

const pool = mysql.createPool({
  host: config.DATABASE_HOST,
  port: config.DATABASE_PORT,
  user: config.DATABASE_USER,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  charset: config.DB_CHARSET,
  waitForConnections: true,
  timezone: 'Z',
  dateStrings: false,
});

export const db = drizzle(pool);
