import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/v1", routes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevVault API is running 🚀",
  });
});

export default app;