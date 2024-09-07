import path from "path";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import categoryRoutes from "./routes/categoryRoutes";
import userRoutes from "./routes/userRoutes";
import goalRoutes from "./routes/goalRoutes";
import achievementRoutes from "./routes/achievementRoutes";
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
      sameSite: "strict",
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGODB_CONNECTION_STRING,
    }),
  })
);

app.use("/api/users", userRoutes);
app.use("/api/categories", requiresAuth, categoryRoutes);
app.use("/api/goals", requiresAuth, goalRoutes);
app.use("/api/achievements", requiresAuth, achievementRoutes);

if (env.NODE_ENV === "PRODUCTION") {
  const rootDirectory = path.join(__dirname, "..", "..", "frontend", "dist");
  app.use(express.static(rootDirectory));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(rootDirectory, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send(`Server is running in ${env.NODE_ENV}`);
  });
}

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
