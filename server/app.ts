import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import goalCategoryRoutes from "./routes/goalCategoryRoutes";
import goalRoutes from "./routes/goalRoutes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/goalcategories", goalCategoryRoutes);
app.use("/api/goals", goalRoutes);

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
