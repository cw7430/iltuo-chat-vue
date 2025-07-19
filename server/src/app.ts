import express from "express";

import { logMiddleware } from "./middlewares";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logMiddleware);

export default app;
