import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import goalListRoutes from "./routes/goalListRoutes";
import userRoutes from "./routes/userRoutes";
import env from "./util/validateEnv";
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGODB_CONNECTION_STRING,
    }),
  })
);

app.use("/api/users", userRoutes);
app.use("/api/goals", requiresAuth, goalListRoutes);

// error handlers
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorCode = 500;
  let errorMessage = "An unknown error occurred.";
  if (isHttpError(error)) {
    errorCode = error.status;
    errorMessage = error.message;
  }
  res.status(errorCode).json({ message: errorMessage });
});

export default app;
