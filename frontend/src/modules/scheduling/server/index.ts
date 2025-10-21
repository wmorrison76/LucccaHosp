import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { weeklyTotalsRouter } from "./routes/payroll/weekly_totals";
import { notifyRouter } from "./routes/notify";
import { filesRouter } from "./routes/files";
import { scheduleRouter } from "./routes/schedule";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Static audit vault (read-only)
  app.use("/vault", express.static("vault"));

  // Payroll and exports
  app.use("/api/payroll", weeklyTotalsRouter);

  // Notifications / audit
  app.use("/api/notify", notifyRouter);
  app.use("/api/files", filesRouter);
  app.use("/api/schedule", scheduleRouter);

  return app;
}
