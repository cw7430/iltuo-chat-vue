declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "production" | "test";
    PORT?: string;
    DATABASE_URL?: string;
    VITE_APP_TITLE?: string;
  }
}
