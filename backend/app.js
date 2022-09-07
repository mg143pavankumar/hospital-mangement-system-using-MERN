import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import patientRoutes from "./routes/patientRoutes.js";
import errorsMiddleware from "./middleware/errors.js";

const app = express();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/v1", patientRoutes);

// Middleware for Errors Handling.
app.use(errorsMiddleware);

export default app;
